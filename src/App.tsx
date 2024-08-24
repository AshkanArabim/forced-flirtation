import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ChatsList from "./components/ChatsList";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ed00f2",
		},
	},
});

export default function App() {
	return (
		<>
			<CssBaseline>
				<ThemeProvider theme={theme}>
					<ChatsList />
				</ThemeProvider>
			</CssBaseline>
		</>
	);
}
