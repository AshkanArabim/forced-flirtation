import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../../interfaces";

// notice how this is NOT an async state. it can be set immediately when user
// clicks to open a chat.

type State = Chat | null;

const initialState: State = null;

export const activeChatSlice = createSlice({
	name: "activeChat",
	initialState: initialState,
	reducers: {
		unsetActiveChat() {
			return initialState;
		},
		setActiveChat(state: State, action: PayloadAction<Chat>) {
			state = action.payload;
		},
	},
});

export const { unsetActiveChat, setActiveChat } = activeChatSlice.actions;
