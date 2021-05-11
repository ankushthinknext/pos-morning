import {
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	makeStyles,
	Paper,
	Select,
	TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	fileInput: {
		display: "none",
	},
	paper: {
		padding: theme.spacing(4),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	formControl: {
		margin: theme.spacing(1),
		width: "100%",
	},
}));

export default function Product() {
	const URL = process.env.REACT_APP_API_BASE_URL;
	const classes = useStyles();
	const [formData, setFormData] = useState({});
	const [imgURL, setImgURL] = useState("");
	const [method, setMethod] = useState("POST");
	const [categories, setCategories] = useState([]);

	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const toBase64 = (file) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const handleFileChange = async (e) => {
		let result = await toBase64(e.target.files[0]);
		setFormData({ ...formData, image: result });
		setImgURL(result);
	};

	useEffect(() => {
		async function getAllCategories() {
			let response = await fetch(`${URL}category`);
			response = await response.json();
			setCategories(response.data.categories);
		}
		getAllCategories();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let form_data = new FormData();
		Object.keys(formData).map((key) => form_data.append(key, formData[key]));
		console.log(form_data);
		try {
			let response = await fetch(`${URL}product`, {
				method: method,

				body: form_data,
			});
			response = await response.json();
		} catch (error) {}
	};

	return (
		<div>
			<Container>
				<h2>Product Form</h2>
				<Paper className={classes.paper}>
					<form onChange={handleFormChange} onSubmit={handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={6}>
								<TextField
									id="filled-required"
									label="Name"
									name="name"
									placeholder="Name"
									variant="filled"
									fullWidth
									shrink="false"
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									id="filled-required"
									label="Price"
									placeholder="Name"
									name="price"
									variant="filled"
									fullWidth
									shrink="false"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="filled-required"
									label="Description"
									placeholder="Name"
									variant="filled"
									name="description"
									fullWidth
									shrink="false"
									multiline
									rows={3}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl variant="filled" className={classes.formControl}>
									<InputLabel htmlFor="filled-age-native-simple">
										Categories
									</InputLabel>
									<Select
										native
										name="category"
										inputProps={{
											name: "category",
											id: "filled-age-native-simple",
										}}>
										<option value="6072bb3903ac77a066c8383b" selected>
											Crockery
										</option>
										{categories.map((category) => (
											<option key={category._id} value={category._id}>
												{category.name}
											</option>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs="12" align="left">
								<img
									style={{ display: "block", marginBottom: "30px" }}
									src={imgURL}
									alt=""
								/>
								<input
									accept="image/*"
									className={classes.fileInput}
									id="contained-button-file"
									multiple
									type="file"
									onChange={handleFileChange}
								/>
								<label htmlFor="contained-button-file">
									<Button
										className="c-button"
										variant="contained"
										color="primary"
										component="span">
										Image
									</Button>
								</label>
							</Grid>
							<Grid item xs={12} align="right">
								<Button
									className="c-button c-button-lg"
									type="submit"
									variant="contained"
									color="primary">
									SUBMIT
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</Container>
		</div>
	);
}
