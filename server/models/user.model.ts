import mongoose from "mongoose";
import Chat from "./chat.model";

const userSchema: mongoose.Schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	profilePicURL: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	chats: [Chat],
});

export default mongoose.model("User", userSchema);
