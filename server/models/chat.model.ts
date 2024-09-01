import mongoose from "mongoose";

const messageSchema: mongoose.Schema = new mongoose.Schema({
	UTCTimestamp: {
		type: Date,
		required: true,
		default: Date.now,
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
});

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
	messages: { type: [messageSchema], required: true, default: [] },
});

export default mongoose.model("Chat", chatSchema);
