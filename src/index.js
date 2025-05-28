export default {
  async fetch(request, env, ctx) {
    if (request.method === "POST") {
      try {
        const { cameras } = await request.json();
        console.log("Received cameras:", cameras);

        // Here you can route to other services or trigger actions
        return new Response(JSON.stringify({ status: "ok", received: cameras }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      } catch (e) {
        return new Response("Invalid JSON", { status: 400 });
      }
    }

    return new Response("OK", { status: 200 });
  }
};