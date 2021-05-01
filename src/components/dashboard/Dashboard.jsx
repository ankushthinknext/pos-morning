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
import Categories from "../categories/Categories";
import Category from "../categories/Category";

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
				{useLocation().pathname === "/transactions" && <Transactions />}
				{useLocation().pathname === "/users" && <Users />}
				{useLocation().pathname.startsWith("/user/") && (
					<User notification={handleNotification} />
				)}
				{useLocation().pathname === "/categories" && <Categories />}
				{useLocation().pathname === "/category" && <Category />}
			</div>
		</div>
	);
}
