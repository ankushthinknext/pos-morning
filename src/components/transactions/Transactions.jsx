import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}
export default function Transactions() {
	const classes = useStyles();
	const URL = process.env.REACT_APP_API_BASE_URL;
	let [categories, setCategories] = useState();
	useEffect(() => {
		async function getAllProducts() {
			let res = await fetch(`${URL}product/transaction`);
			res = await res.json();
			setCategories(res.data.categories);
		}
		getAllProducts();
	});
	console.log(categories);

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={8}>
					<Paper className={classes.paper}>
						<Tabs
							indicatorColor="primary"
							textColor="primary"
							variant="scrollable"
							scrollButtons="auto"
							aria-label="scrollable auto tabs example">
							<Tab label="Item One" {...a11yProps(0)} />
							<Tab label="Item Two" {...a11yProps(1)} />
							<Tab label="Item Three" {...a11yProps(2)} />
							<Tab label="Item Four" {...a11yProps(3)} />
							<Tab label="Item Five" {...a11yProps(4)} />
							<Tab label="Item Six" {...a11yProps(5)} />
							<Tab label="Item Seven" {...a11yProps(6)} />
						</Tabs>
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.paper}>
						<h2>Cart Component</h2>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}
