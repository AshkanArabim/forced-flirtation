import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, AsyncState } from "../../interfaces";

type State = AsyncState<Chat[] | null>;

const initialState: State = {
	data: null,
	loading: false,
	error: null,
};

// TODO: remove this later
// interface loadPayload {
//   i: number,
//   l: number
// }

export const currentChatsSlice = createSlice({
	name: "currentChats",
	initialState: initialState,
	reducers: {
		fetchChatsStart() {
			return {
				data: null,
				loading: true,
				error: null,
			};
		},
		fetchChatsSuccess(state: State, action: PayloadAction<Chat[]>) {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		fetchChatsFailure(state: State, action: PayloadAction<string>) {
			state.loading = false;
			state.data = null;
			state.error = action.payload;
		},
	},
});

export const { fetchChatsFailure, fetchChatsStart, fetchChatsSuccess } = currentChatsSlice.actions;
