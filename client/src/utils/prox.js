// this is show error 

//because of cra 2

// "proxy": {
//     "/auth/*": {
//       "target": "http://localhost:5000"
//     },
//     "/api/*": {
//       "target": "http://localhost:5000"
//     }
//   }

// to solve the above 

// create a folder called setupProxy.js

// read about the above and below

// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(createProxyMiddleware('/auth/*', { target: 'http://localhost:5000' }));
//     app.use(createProxyMiddleware('/api/*', { target: 'http://localhost:5000' }));
// };