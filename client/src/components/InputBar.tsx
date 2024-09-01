import { Send } from "@mui/icons-material";
import { IconButton, Input } from "@mui/material";

export default function InputBar() {
	return (
		<div style={{ display: "flex", gap: "5px", padding: "5px" }}>
			<Input placeholder="Type message here..." style={{flex: "101"}} />
      <IconButton sx={{color: "primary.main"}}>
        <Send />
      </IconButton>
		</div>
	);
}
