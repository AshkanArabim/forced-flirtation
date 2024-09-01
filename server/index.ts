import express from "express";
import mongoose from "mongoose";
import apiRouter from "./routes/api.route"

const app = express();
const PORT = 3001

// add API router
app.use("/api", apiRouter)

// connect to mongo, then start express
mongoose
	.connect("mongodb://127.0.0.1:27017/flirt")
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log("Couldn't connect to DB:");
		console.log(error.message);
	});
