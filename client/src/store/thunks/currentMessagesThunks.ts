import {
	fetchMessagesSuccess,
	fetchMessagesFailure,
	fetchMessagesStart,
} from "../slices/currentMessagesSlice";
import { BACKEND_URL } from "../../vars";
import { Dispatch } from "redux";
import { store, RootState } from "../store";
import { Chat, Message } from "../../interfaces";

export const fetchMessages = (i: number, l: number) => {
	return function (dispatch: Dispatch) {
		dispatch(fetchMessagesStart());

		// assuming a chat is already active (opened)
		// activeChat isn't an async type; hence, no need to check against an AsyncState
		const activeChat: Chat | null = (store.getState() as RootState).activeChat;
		if (!activeChat) {
			dispatch(fetchMessagesFailure("can't fetch messages when no chat is open!"));
			return;
		}

		// fetch messages in the chat
		const messagePromises = (activeChat as Chat).messages.slice(i, i + l).map((messageId) => {
			return fetch(BACKEND_URL + "/api/messages/" + messageId).then((message) => message.json());
		});

		Promise.all(messagePromises)
			.then((messages: Message[]) => {
				dispatch(fetchMessagesSuccess(messages));
			})
			.catch((error) => {
				dispatch(fetchMessagesFailure(error.message));
			});
	};
};
