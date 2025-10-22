// File: api-gateway/index.js (PHIÊN BẢN HOÀN HẢO)
const express = require('express');
const httpProxy = require('http-proxy');

console.log("--- CHAY PHIEN BAN GATEWAY HOAN HAO ---");

const proxy = httpProxy.createProxyServer();
const app = express();

app.use((req, res, next) => {
    console.log(`[GATEWAY NHAN YEU CAU]: ${req.method} ${req.url}`);
    next();
});

// Sửa lại routing ở đây
app.all('/auth*', (req, res) => { // Thay /auth/* bằng /auth*
    console.log('[GATEWAY CHUYEN TIEP] Den auth-service...');
    proxy.web(req, res, { target: 'http://auth-service:3000' });
});

app.all('/products*', (req, res) => { // Thay /products/* bằng /products*
    console.log('[GATEWAY CHUYEN TIEP] Den product-service...');
    proxy.web(req, res, { target: 'http://product-service:3001' });
});

app.all('/orders*', (req, res) => { // Thay /orders/* bằng /orders*
    console.log('[GATEWAY CHUYEN TIEP] Den order-service...');
    proxy.web(req, res, { target: 'http://order-service:3002' });
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`API Gateway phien ban HOAN HAO listening on port ${PORT}`);
});