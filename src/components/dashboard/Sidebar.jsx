import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
	const location = useLocation();
	console.log(location);

	const sidebarLinks = [
		{
			label: "Dashboard",
			path: "/dashboard",
			subpaths: ["user/"],
			icon: <HomeIcon />,
		},
		{ label: "Users", path: "/users", icon: <PeopleAltIcon /> },
		{ label: "Category", path: "/category", icon: <PeopleAltIcon /> },
		{ label: "Products", path: "/products", icon: <PeopleAltIcon /> },
		{ label: "Transactions", path: "/transactions", icon: <PeopleAltIcon /> },
	];
	return (
		<div className="sidebar">
			{sidebarLinks.map((link) => (
				<Link to={link.path}>
					<div
						className={
							link.path === location.pathname ||
							(link.subpaths &&
								link.subpaths.find((link) =>
									location.pathname.startsWith(link),
								))
								? "sidebar-link active"
								: "sidebar-link"
						}>
						{link.icon}
						<h6>{link.label}</h6>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Sidebar;
