import mongoose from "mongoose"

const messageSchema: mongoose.Schema = new mongoose.Schema({
	UTCTimestamp: {
		type: Date,
		default: Date.now,
	},
	senderRef: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true, // no default
	},
	text: {
		type: String,
		required: true, // no default
	},
  senderUsername: {
    type: String,
    required: true
  },
  senderProfilePicURL: {
    type: String,
    default: ""
  },
});

export const messageModel = mongoose.model("Message", messageSchema)

export interface Message {
  UTCTimestamp: Date | undefined,
  senderRef: string,
  text: string,
  senderUsername: string | undefined, 
  senderProfilePicURL: string | undefined
}
