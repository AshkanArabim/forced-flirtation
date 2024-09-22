export interface Message {
  UTCTimestamp: Date,
  senderRef: string, // sender id
  text: string,
  senderUsername: string,
  senderProfilePicURL: string,
}

export interface Chat {
  participants: string[], // participant ids
  messages: string[] // message ids
}

// try to keep this in sync with the backend MongoDB schema
// not including a "password" field for obvious reasons
export interface User {
  _id: string,
  username: string,
  email: string,
  profilePicURL: string,
  chats: string[], // the id pointing to the appropriate chat
}

export interface AsyncState<T> {
  data: T | null,
  loading: boolean,
  error: string | null;
}
