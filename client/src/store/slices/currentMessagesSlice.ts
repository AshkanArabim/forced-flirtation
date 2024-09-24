import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, AsyncState } from "../../interfaces";

// only one chat open at a time, having only one "messages" slice is fine
// I don't care about performance optimizations and caching rn

type State = AsyncState<Message[] | null>;

const initialState: State = {
	data: null,
	loading: false,
	error: null,
};

export const currentMessagesSlice = createSlice({
	name: "currentMessages",
	initialState: initialState,
	reducers: {
		resetMessages() {
			return initialState;
		},
		fetchMessagesStart() {
			return {
				data: null,
				loading: true,
				error: null,
			};
		},
		fetchMessagesSuccess(state: State, action: PayloadAction<Message[]>) {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		fetchMessagesFailure(state: State, action: PayloadAction<string>) {
			state.loading = false;
			state.data = null;
			state.error = action.payload;
		},
	},
});

export const { fetchMessagesStart, fetchMessagesFailure, fetchMessagesSuccess, resetMessages } =
	currentMessagesSlice.actions;
