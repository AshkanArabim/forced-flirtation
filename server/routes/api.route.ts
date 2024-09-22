import express from "express";
import User from "../models/user.model";
import Chat from "../models/chat.model";

const router = express.Router();

// TODO: refactor to reduce duplication
// note: user responses exclude the following fields:
	// password
router.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		const filteredUsers = users.map(user => {
			const { password, ...userWithoutPassword } = user.toObject();
			return userWithoutPassword;
		});
		res.status(200).json(filteredUsers);
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

		if (!user) {
			const msg = `user with id ${id} not found`;
			console.log(msg);
			return res.status(404).json({ message: msg });
		}

		const { password, ...userWithoutPassword } = user.toObject();
		res.status(200).json(userWithoutPassword);
	} catch (error: any) {
		const msg = `failed to get user: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

router.post("/users", async (req, res) => {
	try {
		const user = await User.create(req.body);
		const { password, ...userWithoutPassword } = user.toObject();
		res.status(200).json(userWithoutPassword);
	} catch (error: any) {
		const msg = `failed to create user: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

// user `patch` api
router.patch("/users/:id", async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ runValidators: true, new: true }
		);

		if (!updatedUser) {
			const msg = `user with id ${req.params.id} not found.`;
			console.log(msg);
			return res.status(404).json({ message: msg });
		}

		const { password, ...userWithoutPassword } = updatedUser.toObject();
		res.status(200).json(userWithoutPassword);
	} catch (error: any) {
		const msg = `failed to update user: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

// user `delete` api
router.delete("/users/:id", async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);

		if (!deletedUser) {
			const msg = `User with id ${req.params.id} not found!`;
			console.log(msg);
			return res.status(404).json({ message: msg });
		}

		const { password, ...userWithoutPassword } = deletedUser.toObject();
		res.status(200).json(userWithoutPassword);
	} catch (error: any) {
		const msg = `failed to delete user: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

router.get("/chats/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const chat = await Chat.findById(id);

		if (!chat) {
			const msg = `can't find chat with id ${id}`;
			console.log(msg);
			return res.status(404).json({ message: msg });
		}

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

// chat `post` message adding api
router.post("/chats/:id/messages", async (req, res) => {
	try {
		const chat = await Chat.findByIdAndUpdate(
			req.params.id,
			{ $push: { messages: req.body } },
			{ new: true, runValidators: true }
		);

		if (!chat) {
			const msg = `chat with id ${req.params.id} not found!`;
			console.log(msg);
			return res.status(404).json({ message: msg });
		}

		res.status(200).json(chat);
	} catch (error: any) {
		const msg = `failed to add message to chat: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

// chat `patch` api
router.patch("/chats/:id", async (req, res) => {
	try {
		const chat = await Chat.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ runValidators: true, new: true }
		);

		if (!chat) {
			const msg = `chat with id ${req.params.id} not found!`;
			console.log(msg);
			return res.status(404).json({ message: msg });
		}

		res.status(200).json(chat);
	} catch (error: any) {
		const msg = `couldn't update chat: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

// chat `delete` api
router.delete("/chats/:id", async (req, res) => {
	try {
		const chat = await Chat.findByIdAndDelete(req.params.id);

		if (!chat) {
			const msg = `chat with id ${req.params.id} not found!`;
			console.log(msg);
			return res.status(404).json({ message: msg });
		}

		res.status(200).json(chat);
	} catch (error: any) {
		const msg = `couldn't delete chat: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

// TODO: complex logic:

// delete logic
// make sure to unsubscribe other user as well

// create logic
// make sure to subscribe both users, and point to both from chat

export default router;
