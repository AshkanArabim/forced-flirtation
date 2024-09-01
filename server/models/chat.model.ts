import mongoose from "mongoose";
import User from "./user.model";

const messageSchema = new mongoose.Schema({
	UTCTimestamp: {
		type: Date,
		required: true,
		default: Date.now,
	},
	sender: {
		type: User,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});

const chatSchema = new mongoose.Schema({
	participants: {
		type: [User],
		required: true,
	},
	messages: [messageSchema],
});

export default mongoose.model("Chat", chatSchema);
