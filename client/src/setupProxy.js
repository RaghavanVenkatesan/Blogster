const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/auth/**',createProxyMiddleware({ target: 'http://localhost:5000/',   }));
    app.use('/api/*',createProxyMiddleware({ target: 'http://localhost:5000/',  }));
};

// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = (app) => {
//   app.use(
//     ["/api/*", "/auth/**"],
//     createProxyMiddleware({
//       target: "http://localhost:5000",
//     })
//   );
// };

// module.exports = function(app) {
//   app.use(createProxyMiddleware('/auth/**', { target: 'http://localhost:5000' }));
//   app.use(createProxyMiddleware('/api/*', { target: 'http://localhost:5000' }));
// };