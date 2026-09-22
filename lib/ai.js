/**
 * Optional server-side AI helper.
 * Keep credentials in environment variables only.
 */

export async function askAI(messages, options = {}) {
  const key = process.env.AI_API_KEY;
  if (!key) return { enabled: false, text: "AI is not configured. The deterministic campus engine is still available." };

  const base = (process.env.AI_API_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = options.model || process.env.AI_MODEL || "gpt-5-mini";

  const response = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages, temperature: 0.2 })
  });

  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const data = await response.json();
  return { enabled: true, text: data.choices?.[0]?.message?.content || "" };
}
