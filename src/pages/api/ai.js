export default {
  async fetch(req, env) {
    if (req.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    try {
      const { chat } = await req.json();
      const prompt = chat.map(c = `${c.role.toUpperCase()}: ${c.content}`).join("\n") + "\nAI:";
      const response = await env.AI.run(prompt);
      return new Response(JSON.stringify({ reply: response }), {
        headers: { "Content-Type": "application/json" },
        status: 200
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};