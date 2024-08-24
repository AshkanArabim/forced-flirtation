import { Box, Button, SxProps } from "@mui/material";
import React from "react";

interface Props {
	message: string;
	mainOption?: string;
	otherOptions?: [string];
}

export default function Modal({ message, mainOption, otherOptions }: Props) {
	return (
		// backdrop; covers whole screen
		<div
			style={{
				position: "fixed",
				width: "100vw",
				height: "100vh",
				backgroundColor: "rgba(0, 0, 0, 0.3)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
      {/* this allows window to be scrolled if it overflows */}
      {/* a fixed container (the parent) can't be scrolled */}
			<div
				style={{
					maxHeight: "100%",
					overflow: "scroll",
				}}
			>
				{/* window, centered */}
				<Box
					sx={
						{
							boxShadow: 3,
							bgcolor: "white",
						} as SxProps
					}
					style={
						{
							margin: "10px",
							borderRadius: "5px",
							padding: "10px",
						} as React.CSSProperties
					}
				>
					<p>{message}</p>
					{/* only show buttons if options are provided */}
					{(mainOption || otherOptions) && (
						<div
							style={
								{
									display: "flex",
									gap: "10px",
									justifyContent: "flex-end",
								} as React.CSSProperties
							}
						>
							{otherOptions &&
								otherOptions.map((option) => <Button variant="outlined">{option}</Button>)}
							{mainOption && <Button variant="contained">{mainOption}</Button>}
						</div>
					)}
				</Box>
			</div>
		</div>
	);
}
