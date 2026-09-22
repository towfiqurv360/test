export async function GET() {
  return Response.json({ ok: true, service: "genesis-vidyapeeth", time: new Date().toISOString() });
}
