const express = require("express");
const app = express();
const fs = require("fs");

const enableHttps = process.env.HTTPS;
let server;
if (enableHttps) {
	const key = fs.readFileSync("./key.pem");
	const cert = fs.readFileSync("./cert.pem");
	server = require("https").createServer({ key: key, cert: cert }, app);
} else {
	server = require("http").createServer(app);
}

const io = require("socket.io")(server);
const dotenv = require("dotenv");
const routes = require("./routes/routes");
const path = require("path");

dotenv.config();
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

let controllers = {};

// setInterval(() => io.emit("update", Object.values(controllers)), 10);

io.on("connection", (socket) => {
	socket.on("controller", (data) => {
		if (data && data.controllerID) {
			socket.join(data.controllerID, () => {
				socket.on("update", (data) => {
					if (data && data.coords && data.controllerID) {
						// controllers[socket.id] = data.coords;
						socket
							.to(data.controllerID)
							.emit("update", data.coords);
					}
				});
			});
		}
	});

	socket.on("canvas", (data) => {
		if (data && data.canvasID) {
			socket.join(data.canvasID, () => {});
		}
	});
});

server.listen(process.env.PORT, () => {
	console.clear();
	console.log(
		`Server up and running on ${
			enableHttps ? `https` : `http`
		}://localhost:${process.env.PORT}`,
	);
});
