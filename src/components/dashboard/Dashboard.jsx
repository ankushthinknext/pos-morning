import React from "react";
import Sidebar from "./Sidebar";
import "./index.css";
import Navbar from "./Navbar";

export default function Dashboard() {
	return (
		<div className="dashboard-area">
			<Sidebar />
			<div className="main-content">
				<Navbar />
				<h2>Main Area</h2>
			</div>
		</div>
	);
}
