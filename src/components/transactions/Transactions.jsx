import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const URL = process.env.REACT_APP_API_BASE_URL;
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
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

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}

export default function Transactions() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [categories, setCategories] = useState([]);
	console.log(categories);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		async function getAllCategories() {
			let response = await fetch(`${URL}product/transaction`);
			response = await response.json();
			setCategories(response.data.categories);
		}
		getAllCategories();
	}, []);
	return (
		<div>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={8}>
						<Paper className={classes.paper}>
							<AppBar position="static" color="default">
								<Tabs
									value={value}
									onChange={handleChange}
									indicatorColor="primary"
									textColor="primary"
									variant="scrollable"
									scrollButtons="auto"
									aria-label="scrollable auto tabs example">
									{categories.map((category, index) => (
										<Tab
											key={category._id}
											label={category.name}
											{...a11yProps(index)}
										/>
									))}
								</Tabs>
							</AppBar>
							{categories.map((category, index) => (
								<TabPanel value={value} index={index}>
									{category.items.map((product) => (
										<h5>{product.name}</h5>
									))}
								</TabPanel>
							))}
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.paper}></Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
