import express from "express";

const app = express();
import fs from "fs";

import https from "https";
import http from "http";

const enableHttps = process.env.HTTPS;
let server;
if (enableHttps) {
	const key = fs.readFileSync("./key.pem");
	const cert = fs.readFileSync("./cert.pem");
	server = https.createServer({ key: key, cert: cert }, app);
} else {
	server = http.createServer(app);
}

import { Server } from "socket.io";
const io = new Server(server);

import dotenv from "dotenv";
import routes from "./routes/routes.js";
import path from "path";

const dirname = path.resolve();

dotenv.config();
app.use(express.static(path.join(dirname, "public")));

app.use("/", routes);

io.on("connection", (socket) => {
	socket.on("controller", async (data) => {
		if (data?.controllerID) {
			await socket.join(data.controllerID);
		}
	});

	socket.on("update", (data, room) => {
		if (data?.coords && data.controllerID) {
			socket.to(data.controllerID).emit("update", data.coords);
		}
	});

	socket.on("canvas", (data) => {
		if (data?.canvasID) {
			socket.join(data.canvasID, () => {});
		}
	});
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.clear();
	console.log(
		`Server up and running on ${
			enableHttps ? `https` : `http`
		}://localhost:${PORT}`
	);
});
