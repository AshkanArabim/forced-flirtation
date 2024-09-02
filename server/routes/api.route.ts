import express from "express";
import User from "../models/user.model";
import Chat from "../models/chat.model";

const router = express.Router();

// TODO: refactor to reduce duplication

router.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (error: any) {
		const msg = `failed to get users: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

router.get("/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		res.status(200).json(user);
	} catch (error: any) {
		const msg = `failed to get user: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

router.post("/users", async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.status(200).json(user);
	} catch (error: any) {
		const msg = `failed to create user: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

router.get("/chats/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const chat = await Chat.findById(id);
		res.status(200).json(chat);
	} catch (error: any) {
		const msg = `failed to get chat: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

router.post("/chats", async (req, res) => {
	try {
		const chat = await Chat.create(req.body);
		res.status(200).json(chat);
	} catch (error: any) {
		const msg = `failed to create chat: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

// delete logic
// make sure to unsubscribe other user as well

// create logic
// make sure to subscribe both users, and point to both from chat

export default router;
