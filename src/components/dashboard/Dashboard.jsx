import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "./index.css";
import Navbar from "./Navbar";
import Main from "./Main";
import { useLocation } from "react-router";
import Users from "../users/Users";
import User from "../users/User";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Transactions from "../transactions/Transactions";

export default function Dashboard() {
	const [notification, setNotification] = useState({
		message: "success",
		open: false,
		status: "error",
	});
	const handleClose = () => {
		setNotification({ ...notification, ["open"]: false });
	};

	const handleNotification = (note) => {
		console.log("Notification function calls", note);
		setNotification({
			...notification,
			["status"]: note.status,
			["message"]: note.message,
			["open"]: note.open,
		});
	};

	return (
		<div className="dashboard-area">
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				onClose={handleClose}
				open={notification.open}
				autoHideDuration={2000}>
				<Alert severity={notification.status} onClose={handleClose}>
					{notification.message}
				</Alert>
			</Snackbar>
			<Sidebar />
			<div className="main-content">
				<Navbar />
				{useLocation().pathname === "/dashboard" && <Main />}
				{useLocation().pathname === "/users" && <Users />}
				{useLocation().pathname === "/transactions" && <Transactions />}
				{useLocation().pathname.startsWith("/user/") && (
					<User notification={handleNotification} />
				)}
			</div>
		</div>
	);
}
