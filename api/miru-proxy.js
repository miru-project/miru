const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = async (req, res) => {
  let target = "";
  if (req.url.startsWith("/request")) {
    target = req.headers["miru-url"];
    if (!target) {
      res.redirect("https://miru.0n0.dev");
      return;
    }
  }
  console.log(req.headers);
  createProxyMiddleware({
    target,
    changeOrigin: true,
    headers: {
      "user-agent": req.headers["miru-ua"] ?? req.headers["user-agent"],
      "referer": req.headers["miru-referer"] ?? req.headers["referer"],
    },
    pathRewrite: {
      "^/request/": "/",
    },
    secure: false,
  })(req, res);
  console.log(res);
};
