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
	right: "0",
};

export default function MyMessage({ text }: Props) {
	return (
		<div
			style={{
				display: "flex",
				position: "relative",
				justifyContent: "flex-end",
				padding: "0 10px 0 0",
			}}
		>
			{/* the tail of the bubble */}
			<Box sx={{ color: "primary.main" }}>
				<RightTriangle style={rightTriangleStyle as React.CSSProperties} />
			</Box>

			<Box
				sx={{ bgcolor: "primary.main", color: "white" }}
				style={{ borderRadius: "10px", padding: "5px 10px" }}
			>
				{text}
			</Box>
		</div>
	);
}
