import mongoose from "mongoose";

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
	chats: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Chat",
			},
		],
		required: true,
		default: [],
	},
});

export default mongoose.model("User", userSchema);
