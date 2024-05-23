const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/noticews',
        createProxyMiddleware({
            target: 'http://localhost:8090',
            changeOrigin: true,
            ws: true,
        })
    );
    app.use(
        '/chatws',
        createProxyMiddleware({
            target: 'http://localhost:8090',
            changeOrigin: true,
            ws: true,
        })
    );
}