const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const configs = {
        '/api': createProxyMiddleware({
            "target": "https://test.im-dangdang.com",
            "pathRewrite": {
                "/api": ""
            },
            "changeOrigin": true
        }),
        '/gzqApi': createProxyMiddleware({
            "target": "https://test-gzq.im-dangdang.com",
            "pathRewrite": {
                "/gzqApi": ""
            },
            "changeOrigin": true
        })
    }
    Object.entries(configs).forEach(([k, v]) => app.use(k, v));
    //app.use(...) //可以配置多个代理
}