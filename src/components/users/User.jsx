import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	paper: {
		padding: "20px",
		marginTop: "30px",
	},
	formControl: {
		width: "100%",
	},
}));

export default function User() {
	const URL = process.env.REACT_APP_API_BASE_URL;
	const classes = useStyles();
	const [formData, setFormData] = useState({});

	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		let response = await fetch(`${URL}user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		let result = response.json();
		console.log(result);
	};

	return (
		<Container component="main" maxWidth="lg">
			<Paper className={classes.paper}>
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						User Form
					</Typography>
					<form
						onChange={handleFormChange}
						onSubmit={handleFormSubmit}
						className={classes.form}
						noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									className="c-rounded"
									autoComplete="fname"
									name="fullname"
									variant="filled"
									required
									fullWidth
									id="firstName"
									label="Full Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									className="c-rounded"
									variant="filled"
									required
									fullWidth
									id="lastName"
									label="Username"
									name="username"
									autoComplete="lname"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									className="c-rounded"
									autoComplete="fname"
									variant="filled"
									name="email"
									required
									fullWidth
									id="firstName"
									label="Email"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl className={classes.formControl}>
									<TextField
										className="c-rounded"
										required
										variant="filled"
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor="age-native-simple">Role</InputLabel>
									<Select
										className="c-rounded"
										name="role"
										native
										variant="filled"
										inputProps={{
											name: "role",
											id: "age-native-simple",
										}}>
										<option aria-label="None" value="" />
										<option value="Cashier">Cashier</option>
										<option value="Admin">Admin</option>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container justify="flex-end" item xs={12}>
							<Button
								align="left"
								size="large"
								type="submit"
								variant="contained"
								color="primary"
								className="c-button">
								Submit
							</Button>
						</Grid>
					</form>
				</div>
			</Paper>
		</Container>
	);
}
