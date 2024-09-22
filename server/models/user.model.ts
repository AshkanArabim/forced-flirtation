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

export const userModel = mongoose.model("User", userSchema);

export interface User {
	username: string | undefined,
	email: string,
	profilePicURL: string | undefined,
	password: string,
	chats: string[]
}
