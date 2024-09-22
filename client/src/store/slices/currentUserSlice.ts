import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AsyncState } from "../../interfaces";

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
			return initialState;
		},
	},
});

export const { setUser, unsetUser } = currentUserSlice.actions;
