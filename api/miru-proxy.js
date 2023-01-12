const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = async (req, res) => {
    let target = ''
    if (req.url.startsWith('/request')) {
        target = req.headers['miru-url']
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