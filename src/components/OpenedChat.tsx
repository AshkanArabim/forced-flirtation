import { Avatar, ListItem, ListItemAvatar, ListItemText, Box } from "@mui/material";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import InputBar from "./InputBar";

interface Props {
	name: string;
	profilePicURL: string;
}

export default function OpenedChat({ name, profilePicURL }: Props) {
	return (
		<Box
			sx={{ bgcolor: "secondary.main" }}
			style={{ height: "100vh", display: "flex", flexDirection: "column" }}
		>
			{/* chat header */}
			<ListItem
				sx={{ bgcolor: "white", boxShadow: 3 }}
				style={{
					position: "relative", // prioritize z index for the box shadow
					zIndex: 1,
				}}
			>
				<ListItemAvatar>
					<Avatar alt={`${name}'s profile picture`} src={profilePicURL} />
				</ListItemAvatar>
				<ListItemText primary={name} />
			</ListItem>

			{/* conversation  */}
			{/* cmt: dummy data */}
			<Box
				style={{
					flex: "101",
					overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end"
				} as React.CSSProperties}
			>
				<Box
					style={
						{
							display: "flex",
							flexDirection: "column",
							justifyContent: "flex-end",
							gap: "10px",
							margin: "10px",
						} as React.CSSProperties
					}
				>
					<MyMessage text="Hey here :)" />
					<TheirMessage text="Hey! what's up!" />
				</Box>
			</Box>

			{/* message input bar */}
			<Box
				sx={{ bgcolor: "white", boxShadow: 3 }}
				style={{
					position: "relative", // prioritize z index for the box shadow
					zIndex: 1,
				}}
			>
				<InputBar />
			</Box>
		</Box>
	);
}
