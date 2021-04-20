import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";

function Navbar() {
	const [userInfo, setUserInfo] = useState(false);
	console.log(userInfo);
	return (
		<div className="p-navbar">
			<div className="user-info">
				<Avatar onClick={() => setUserInfo(!userInfo)}>AK</Avatar>
				<ul className={userInfo ? "user-info-list" : "user-info-list hide"}>
					<li>Settings</li>
					<li>Account</li>
					<li>Logout</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
