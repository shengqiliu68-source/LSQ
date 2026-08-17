interface Env {
  ASSETS: {
    fetch(input: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== "GET") return response;

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const isNavigation = request.headers.get("sec-fetch-mode") === "navigate";
    if (!acceptsHtml && !isNavigation) return response;

    // Fetching /index.html is canonicalized to / by Sites hosting, which
    // changes the browser URL and breaks client-side deep links. Fetching the
    // root document directly preserves the original navigation URL.
    const indexUrl = new URL("/", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
