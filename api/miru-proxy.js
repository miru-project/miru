const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = async (req, res) => {
    let target = ''
    if (req.url.startsWith('/request')) {
        target = req.headers['miru-url']
        if (!target) {
            res.redirect('https://miru.0n0.dev')
            return
        }
    }
    console.log(req.headers);
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/request/': '/'
        },
        secure: false,
    })(req, res)
    console.log(res);
}