import express from "express";
import { createClient, RedisError, print as redisPrint } from "redis";

const app = express();
const client = createClient({
	port: 6379,
	host: "redis",
});
client.on("error", (err: RedisError) => console.log("Redis Client Error", err));

app.get("/", (req, res) => {
	res.send("Hello world");
});

app.get("/number", async (req, res) => {
	client.get("number", (err, repl) => {
		if (err) {
			return res.status(400).send("Error");
		}
		if (!repl) {
			console.log("Cache Exp");
			const newNum = Math.round(Math.random() * 100).toString();
			client.set("number", newNum, "EX", 10);
			return res.json({ repl: newNum });
		}
		res.json({ repl });
	});
});

app.listen(3000, () => {
	console.log("Server started");
});
