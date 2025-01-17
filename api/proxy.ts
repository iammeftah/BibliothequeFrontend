import * as http from "node:http";

export default async function handler(req, res) {
    const options = {
        hostname: '51.120.122.37', // Replace with your backend's HTTP URL
        port: 80, // HTTP port
        path: req.url.replace('/api', ''), // Remove `/api` prefix from the request path
        method: req.method, // Forward the HTTP method (GET, POST, etc.)
        headers: req.headers, // Forward the headers
    };

    const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });
}