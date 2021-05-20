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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

	const [open, setOpen] = React.useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
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
		getAllCategories();
		getAllProducts();
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
							<Cart cartItems={cartItems} handleCartCounter={cartCounter} />
						</Paper>
					</Grid>
				</Grid>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">
						{"Use Google's location service?"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Let Google help apps determine location. This means sending
							anonymous location data to Google, even when no apps are running.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							className="c-button c-button-lg c-button-rounded"
							onClick={handleClose}
							size="large"
							color="primary">
							Disagree
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</div>
	);
}
