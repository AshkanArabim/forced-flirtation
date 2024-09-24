import { fetchChatsFailure, fetchChatsSuccess, fetchChatsStart } from "../slices/currentChatsSlice";
import { BACKEND_URL } from "../../vars";
import { Dispatch } from "redux";
import { store, RootState } from "../store";
import { AsyncState, User, Chat } from "../../interfaces";

export const fetchChats = (i: number, l: number) => {
	return function (dispatch: Dispatch) {
		dispatch(fetchChatsStart());

		// assuming the user already exists in redux at the time of call
		// user object already has references to chats
		const currentAsyncUser = (store.getState() as RootState).currentUser as AsyncState<User | null>;
		if (currentAsyncUser.data === null) {
			dispatch(fetchChatsFailure("can't get chats when no user is logged in!"));
			return;
		}

		const currentUser: User = currentAsyncUser.data as User;

		// fetch user's chat objects
		const chatFetchPromises = currentUser.chats.slice(i, i + l).map((chatID) => {
			return fetch(BACKEND_URL + "/api/chat/" + chatID).then((response) => response.json());
		});

		Promise.all(chatFetchPromises)
			.then((chats: Chat[]) => {
				dispatch(fetchChatsSuccess(chats));
			})
			.catch((error) => {
				dispatch(fetchChatsFailure(error.message));
			});

		// update redux with new chat objects
	};
};
