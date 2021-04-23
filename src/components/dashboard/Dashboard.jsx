import React from "react";
import Sidebar from "./Sidebar";
import "./index.css";
import Navbar from "./Navbar";
import Main from "./Main";
import { useLocation } from "react-router";
import Users from "../users/Users";

export default function Dashboard() {
	return (
		<div className="dashboard-area">
			<Sidebar />
			<div className="main-content">
				<Navbar />
				{useLocation().pathname === "/dashboard" && <Main />}
				{useLocation().pathname === "/users" && <Users />}
			</div>
		</div>
	);
}
