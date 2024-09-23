import { currentUserSlice } from "./slices/currentUserSlice";
import { currentChatsSlice } from "./slices/currentChatsSlice";
// import { currentMessagesSlice } from './slices/currentMessagesSlice'
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { activeChatSlice } from "./slices/activeChatSlice";

export const store = configureStore({
	reducer: {
		currentUser: currentUserSlice.reducer,
		currentChats: currentChatsSlice.reducer,
		activeChat: activeChatSlice.reducer,
		// currentMessages: currentMessagesSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: true,
		}),
});

// required for TS - see obsidian notes for "redux toolkit"
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
