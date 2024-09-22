import express from "express";
import { userModel, User} from "../models/user.model";
import {chatModel, Chat} from "../models/chat.model";
import {messageModel, Message} from "../models/message.model";

const router = express.Router();

// TODO: refactor to reduce duplication
// user responses exclude the following fields:
// password
router.get("/users", async (req, res) => {
	try {
		const users = await userModel.find({});
		const filteredUsers = users.map((user) => {
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
		const user = await userModel.findById(id);

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
		const user = await userModel.create(req.body);
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
		const updatedUser = await userModel.findByIdAndUpdate(
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
		const deletedUser = await userModel.findByIdAndDelete(req.params.id);

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
		const chat = await chatModel.findById(id);

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
		const chat = await chatModel.create(req.body);
		res.status(200).json(chat);
	} catch (error: any) {
		const msg = `failed to create chat: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
});

// chat `post` message adding api
// note: processed till here ^^
router.post("/chats/:chatId/messages", async (req: {body: Message, params: any}, res) => {
	try {
		// find the user object (to copy its basic info to the message)
		const user: User | null = await userModel.findById(req.body.senderRef)

		if (!user) {
			const msg = `user with id ${req.body.senderRef} not found!`;
			console.log(msg);
			return res.status(404).json({ message: msg });
		}

		// add the info to the message object
		let newMessageJSON = req.body;
		newMessageJSON.senderUsername = user.username ? user.username : user.email;
		newMessageJSON.senderProfilePicURL = user.profilePicURL;

		// create the message entry in the db
		const newMessage = await messageModel.create(newMessageJSON)

		// push the message id to the chat
		const chat = await chatModel.findByIdAndUpdate(
			req.params.chatId,
			{ $push: { messages: newMessage._id } },
			{ new: true, runValidators: true }
		);

		if (!chat) {
			const msg = `chat with id ${req.params.chatId} not found!`;
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
		const chat = await chatModel.findByIdAndUpdate(
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
		const chat = await chatModel.findByIdAndDelete(req.params.id);

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

router.get("/messages/:messageId", async (req, res) => {
	try {
		const message = await messageModel.findById(req.params.messageId)
		res.status(200).json(message)
	} catch (error: any) {
		const msg = `failed to get message: ${error.message}`;
		console.log(msg);
		res.status(500).json({ message: msg });
	}
})

// TODO: complex logic:

// delete logic
// make sure to unsubscribe other user as well

// create logic
// make sure to subscribe both users, and point to both from chat

export default router;
