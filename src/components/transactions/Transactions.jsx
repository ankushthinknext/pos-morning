import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
	},
}));
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}
export default function Transactions() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
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
			<Grid alignItems="stretch" container spacing={2}>
				<Grid item xs={8}>
					<Paper className={classes.paper}>
						<Tabs
							onChange={handleChange}
							value={value}
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
						<TabPanel value={value} index={0}>
							Item One
						</TabPanel>
						<TabPanel value={value} index={1}>
							Item Two
						</TabPanel>
						<TabPanel value={value} index={2}>
							Item Three
						</TabPanel>
						<TabPanel value={value} index={3}>
							Item Four
						</TabPanel>
						<TabPanel value={value} index={4}>
							Item Five
						</TabPanel>
						<TabPanel value={value} index={5}>
							Item Six
						</TabPanel>
						<TabPanel value={value} index={6}>
							Item Seven
						</TabPanel>
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
