import { Box } from "@mui/material";
import RightTriangle from "../assets/right_triangle.svg?react";

interface Props {
	text: string;
}

const rightTriangleStyle = {
	position: "absolute",
	height: "20px",
	width: "20px",
	bottom: "0",
	left: "0",
  transform: "scaleX(-1)"
};

export default function TheirMessage({ text }: Props) {
	return (
		<div
			style={{
				display: "flex",
				position: "relative",
				padding: "0 0 0 10px",
			}}
		>
			{/* the tail of the bubble */}
			<Box sx={{ color: "white" }}>
				<RightTriangle style={rightTriangleStyle as React.CSSProperties} />
			</Box>

			<Box
				sx={{ bgcolor: "white" }}
				style={{ borderRadius: "10px", padding: "5px 10px" }}
			>
				{text}
			</Box>
		</div>
	);
}
