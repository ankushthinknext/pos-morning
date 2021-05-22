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
import Cart from "./Cart";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import Receipt from "./Receipt";

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
	card: {
		width: "20%",
		display: "inline-block",
		marginLeft: "20px",
	},
	media: {
		height: 140,
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
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [settings, setSettings] = useState({});
	const [receiptData, setRecieptData] = useState("");
	console.log(receiptData);

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		console.log("function working");
		setOpen(false);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const cartUpdate = (id) => {
		let cartItemsCopy = [...cartItems];
		let cartItemIndex = cartItemsCopy.findIndex((c) => c._id === id);
		if (cartItemIndex === -1) {
			let selectedItem = products.find((p) => p._id === id);
			selectedItem.qty = 1;
			setCartItems([...cartItems, selectedItem]);
		} else {
			cartItemsCopy.splice(cartItemIndex, 1);
			setCartItems(cartItemsCopy);
		}
	};

	const cartCounter = (id, action) => {
		let cartItemsCopy = [...cartItems];
		let cartItemIndex = cartItemsCopy.findIndex((c) => c._id === id);

		if (action === "increment") cartItemsCopy[cartItemIndex].qty++;
		else if (action === "decrement") cartItemsCopy[cartItemIndex].qty--;
		if (cartItemsCopy[cartItemIndex].qty === 0)
			cartItemsCopy.splice(cartItemIndex, 1);

		setCartItems(cartItemsCopy);
	};
	const submitTransaction = () => {
		console.log("submit tranactions");
		let subTotal = cartItems.reduce(
			(total, item) => total + item.qty * item.price,
			0,
		);

		let discount = (parseInt(settings.discount) / 100) * subTotal;
		let tax = (parseFloat(settings.tax) / 100) * subTotal;
		let grandTotal = tax - discount;
		let transactionsData = {
			items: [...cartItems],
			discount,
			grandtotal: grandTotal,
			subtotal: subTotal,
		};
		console.log(transactionsData);
		fetch(`${URL}transaction`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(transactionsData),
		})
			.then((result) => result.json())
			.then((result) => setRecieptData(result.data));
		setOpen(true);
	};

	console.log("Reciept", receiptData);
	useEffect(() => {
		async function getAllCategories() {
			let response = await fetch(`${URL}product/transaction`);
			response = await response.json();
			setCategories(response.data.categories);
		}
		async function getAllProducts() {
			let response = await fetch(`${URL}product?limit=1000`);
			response = await response.json();
			setProducts(response.data.products);
		}
		async function getSettings() {
			let response = await fetch(`${URL}setting`);
			response = await response.json();
			setSettings(response.data);
		}

		getAllCategories();
		getAllProducts();
		getSettings();
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
										<Card
											onClick={() => cartUpdate(product._id)}
											className={classes.card}>
											<CardActionArea>
												<CardMedia
													className={classes.media}
													image={product.image}
													title="Contemplative Reptile"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="h2">
														{product.name}
													</Typography>
													<Typography gutterBottom variant="h5" component="h2">
														{`$ ${product.price}`}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary"
														component="p">
														{product.description}
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									))}
								</TabPanel>
							))}
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.paper}>
							<Cart
								cartItems={cartItems}
								storeSettings={settings}
								handleCartCounter={cartCounter}
								handleTransaction={submitTransaction}
							/>
						</Paper>
					</Grid>
				</Grid>
				<Receipt
					handleOpen={open}
					handleClose={handleClose}
					receiptData={receiptData}
				/>
			</Container>
		</div>
	);
}
