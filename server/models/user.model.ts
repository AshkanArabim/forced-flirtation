import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
	username: {
		type: String,
		default: "", // will use email as username if not provided
	},
	email: {
		type: String,
		required: true,
	},
	profilePicURL: {
		type: String,
		default: "",
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
		default: [],
	},
});

export default mongoose.model("User", userSchema);
