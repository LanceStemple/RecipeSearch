const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/.netlify/functions/',
    createProxyMiddleware({
      target: 'http://localhost:8000', // Change this to the port your Express server is running on
      changeOrigin: true,
    })
  );
};