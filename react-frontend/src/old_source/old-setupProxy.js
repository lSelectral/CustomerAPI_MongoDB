const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/customer",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7068',
        secure: false
    });

    app.use(appProxy);
};