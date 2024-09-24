import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AsyncState } from "../../interfaces";
import { unsetActiveChat } from "./activeChatSlice";
import { resetMessages } from "./currentMessagesSlice";
import { resetChats } from "./currentChatsSlice";
import { store } from "../store";

type State = AsyncState<User | null>;

const initialState: State = {
	data: null,
	loading: false,
	error: null,
};

export const currentUserSlice = createSlice({
	name: "currentUser",
	initialState: initialState,
	reducers: {
		setUser(state: State, action: PayloadAction<User>) {
			state.data = action.payload;
		},
		unsetUser() {
			store.dispatch(unsetActiveChat());
			store.dispatch(resetMessages());
			store.dispatch(resetChats());
			return initialState;
		},
	},
});

export const { setUser, unsetUser } = currentUserSlice.actions;
