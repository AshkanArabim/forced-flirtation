import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import OpenedChat from "./components/OpenedChat";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ed00f2",
		},
		secondary: {
			main: "#fed3ff"
		}
	},
});

export default function App() {
	return (
		<>
			<CssBaseline>
				<ThemeProvider theme={theme}>
					{/* <ChatsList /> */}
					{/* cmt: vv temp */}
					<OpenedChat
						name="Ashkan Arabi"
						profilePicURL="https://t3.ftcdn.net/jpg/06/31/73/70/360_F_631737076_vZHE8sgzUwOMMJM1bDMefRbsMsJ4dCL8.jpg"
					/>
				</ThemeProvider>
			</CssBaseline>
		</>
	);
}
