const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(
//         '/websocket',
//         createProxyMiddleware({
//             target: 'http://1.220.247.76:8090',
//             changeOrigin: true,
//             ws: true,
//         })
//     );
// }
module.exports = function(app) {
    app.use(
        '/websocket',
        createProxyMiddleware({
            target: 'http://localhost:8090',
            changeOrigin: true,
            ws: true,
        })
    );
}