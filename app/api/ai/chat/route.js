import { askAI } from "@/lib/ai";

export async function POST(request) {
  try {
    const { message, context = {} } = await request.json();
    if (!message || typeof message !== "string") return Response.json({ error: "Message is required." }, { status: 400 });

    const system = `You are Genesis AI, a school study assistant.
Explain concepts at the learner's level. Never fabricate school records.
For administrative questions, tell the user when a teacher/admin must verify the answer.
Context: ${JSON.stringify(context).slice(0, 5000)}`;

    const result = await askAI([
      { role: "system", content: system },
      { role: "user", content: message.slice(0, 6000) }
    ]);

    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "AI request failed.", detail: error.message }, { status: 500 });
  }
}
