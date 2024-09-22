import mongoose from "mongoose";

const chatSchema: mongoose.Schema = new mongoose.Schema({
	participants: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		required: true, // no default
	},
	messages: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
			},
		],
		required: true,
		default: [],
	},
});

export const chatModel = mongoose.model("Chat", chatSchema);

export interface Chat {
	participants: string[] | undefined,
	messages: string[] | undefined
}
