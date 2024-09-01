import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Modal from "./components/Modal";
import ChatsList from "./components/ChatsList";

const theme = createTheme({
	palette: {
		primary: {
			main: "#ed00f2",
		},
		secondary: {
			main: "#fed3ff",
		},
	},
});

export default function App() {
	return (
		<>
			<CssBaseline>
				<ThemeProvider theme={theme}>
					{/* cmt: vv temp */}
					<ChatsList />
					{/* <OpenedChat
						name="Ashkan Arabi"
						profilePicURL="https://t3.ftcdn.net/jpg/06/31/73/70/360_F_631737076_vZHE8sgzUwOMMJM1bDMefRbsMsJ4dCL8.jpg"
					/> */}
					<Modal
						message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac neque id ligula venenatis venenatis. Integer felis eros, commodo in cursus eu, varius a massa. Nunc in egestas mauris. Fusce lacus diam, accumsan ut quam id, imperdiet interdum felis. Vestibulum porta luctus neque, vel posuere odio finibus et. Vivamus sem ante, ultricies sit amet rutrum sit amet, tristique vel libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed elementum nulla ligula, nec fringilla sapien bibendum vel. Quisque elementum vehicula ante, nec dignissim velit varius non. Donec felis nibh, condimentum nec arcu ac, vulputate sodales orci. Donec vel mollis sem."
						mainOption="yes"
						otherOptions={["no"]}
					/>
				</ThemeProvider>
			</CssBaseline>
		</>
	);
}
