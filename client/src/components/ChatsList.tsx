import { Box, Divider, Fab, List } from "@mui/material";
import Logo from "../assets/logo.svg?react";
import ChatsListRow from "./ChatsListRow";
import { Add } from "@mui/icons-material";

export default function ChatsList() {
	// cmt: dummy chat rows
	const chats = [
		{
			name: "Ashkan Arabi",
			lastMessage: "Hey! what's up!",
			profilePicURL:
				"https://t3.ftcdn.net/jpg/06/31/73/70/360_F_631737076_vZHE8sgzUwOMMJM1bDMefRbsMsJ4dCL8.jpg",
		},
	];

	return (
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			{/* header with logo */}
			<div
				style={{
					backgroundColor: "var(--dark-gray)",
					padding: "15px 25px",
				}}
			>
				<Logo fill="var(--theme-main)" />
			</div>

			{/* render list of chats, or show "no messages yet" */}
			{chats.length > 0 ? (
				<List disablePadding={true} style={{
					flex: "100",
				}}>
					{chats.map((row) => (
						<>
							<ChatsListRow
								name={row.name}
								lastMessage={row.lastMessage}
								profilePicURL={row.profilePicURL}
							/>
							<Divider />
						</>
					))}
				</List>
			) : (
				<Box
					sx={{ color: "text.secondary" }}
					style={{
						padding: "20px",
						display: "flex",
						flexDirection: "column",
						flex: "100",
						justifyContent: "center",
					}}
				>
					<p style={{ padding: 0, margin: 0, textAlign: "center" }}>
						No messages yet. Use the "+" button to start a new chat!
					</p>
				</Box>
			)}

			{/* footer */}
			<div
				style={{
					backgroundColor: "var(--dark-gray)",
				}}
			>
				<p style={{textAlign: 'center'}}>Source code found <a href="https://github.com/AshkanArabim/forced-flirtation">here</a></p>
			</div>

			{/* new chat button */}
			<Fab color="primary" sx={{ position: "absolute", zIndex: 1, bottom: 20, right: 20 }}>
				<Add />
			</Fab>
		</div>
	);
}
