const http = require("http");
const port = 3000;

const createServer = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.end("Hello World!");
});

createServer.listen(port, () => {
	console.log("Server Started!");
});