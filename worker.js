export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname !== "aiden-lin.com") {
      const redirectUrl = `https://aiden-lin.com${url.pathname}${url.search}`;
      return Response.redirect(redirectUrl, 302);
    }

    return env.ASSETS.fetch(request);
  },
};
