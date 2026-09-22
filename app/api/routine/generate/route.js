import { generateVerifiedRoutine } from "@/lib/routine-engine";
import { askAI } from "@/lib/ai";

export async function POST(request) {
  try {
    const input = await request.json();

    if (!Array.isArray(input.days) || !Array.isArray(input.periods) || !Array.isArray(input.requirements)) {
      return Response.json({ error: "days, periods and requirements are required." }, { status: 400 });
    }

    // AI can normalize human preferences, but its output is never trusted as a final schedule.
    let aiNote = null;
    if (input.preferences && process.env.AI_API_KEY) {
      const ai = await askAI([
        { role: "system", content: "Normalize school timetable preferences into concise planning notes. Do not create a timetable. Never override hard constraints." },
        { role: "user", content: JSON.stringify(input.preferences).slice(0, 5000) }
      ]);
      aiNote = ai.text;
    }

    const result = generateVerifiedRoutine(input);
    return Response.json({ ...result, aiNote });
  } catch (error) {
    return Response.json({ error: "Routine generation failed.", detail: error.message }, { status: 500 });
  }
}
