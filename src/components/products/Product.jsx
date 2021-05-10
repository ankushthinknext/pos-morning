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
import React, { useState } from "react";

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
	const classes = useStyles();
	const [formData, setFormData] = useState({});

	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const toBase64 = (e) => {
		var file = e.target.files[0];
		console.log(file);
		var reader = new FileReader();
		reader.onloadend = function () {
			console.log("RESULT", reader.result);
		};
		console.log(reader);
	};

	const handleFileChange = (e) => {
		console.log("function called");
		toBase64(e.target);
		// setFormData({ ...formData, image: fileOutput });
	};

	return (
		<div>
			<Container>
				<h2>Product Form</h2>
				<Paper className={classes.paper}>
					<form onChange={handleFormChange}>
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
											name: "Categories",
											id: "filled-age-native-simple",
										}}>
										<option aria-label="None" value="" />
										<option value={10}>Ten</option>
										<option value={20}>Twenty</option>
										<option value={30}>Thirty</option>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs="12" align="left">
								<input
									accept="image/*"
									className={classes.fileInput}
									id="contained-button-file"
									multiple
									type="file"
									onChange={toBase64}
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
									variant="contained"
									color="primary"
									component="span">
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
