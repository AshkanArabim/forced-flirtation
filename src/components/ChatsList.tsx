import Logo from "../assets/logo.svg?react";

export default function ChatsList() {
	return (
		<div>
			<div style={{ backgroundColor: "var(--dark-gray)", display: "flex", alignItems: "center", padding: "15px 25        px"}}>
				<Logo fill="var(--theme-main)" />
			</div>
		</div>
	);
}
