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
			access: ["Admin", "Cashier"],
		},
		{
			label: "Users",
			path: "/users",
			icon: <PeopleAltIcon />,
			access: ["Admin"],
		},
		{
			label: "Category",
			path: "/categories",
			icon: <PeopleAltIcon />,
			access: ["Admin"],
		},
		{
			label: "Products",
			path: "/products",
			icon: <PeopleAltIcon />,
			access: ["Admin", "Cashier"],
		},
		{
			label: "Transactions",
			path: "/transactions",
			icon: <PeopleAltIcon />,
			access: ["Admin", "Cashier"],
		},
	];
	return (
		<div className="sidebar">
			{sidebarLinks.map(
				(link) =>
					link.access.includes(localStorage.getItem("role")) && (
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
					),
			)}
		</div>
	);
}

export default Sidebar;
