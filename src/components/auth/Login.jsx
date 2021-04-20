import { React, useState } from "react";
import Joi from "joi-browser";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { NetworkWifiTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	alert: {
		marginBottom: theme.spacing(1),
	},
}));

export default function Login(props) {
	const URL = process.env.REACT_APP_API_BASE_URL;

	const classes = useStyles();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState([]);

	const handleChanges = (e) => {
		let newFormData = { ...formData };
		newFormData[e.target.name] = e.target.value;
		setFormData(newFormData);
	};
	const validateSchema = {
		username: Joi.string().min(8).max(20).required(),
		password: Joi.string().min(8).max(20).required(),
	};
	const validateFormData = () => {
		let result = Joi.validate(formData, validateSchema, { abortEarly: false });
		if (result.error) {
			setErrors(result.error.details);
			return true;
		} else {
			setErrors([]);
			return false;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateFormData()) return null;
		//attempt login
		let response = await fetch(`${URL}auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		response = await response.json();
		if (response.status === "failed") {
			let newErrors = [...errors];
			newErrors.push(response);
			setErrors(newErrors);
		} else if (response.status === "success") {
			setErrors([]);
			console.log(response);
			localStorage.setItem("token", response.token);
			localStorage.setItem("name", response.user.fullname);
			localStorage.setItem("role", response.user.role);
			props.history.push("/dashboard");
		}
	};

	console.log("Error hooks errors", errors);
	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					{errors &&
						errors.map((error) => (
							<Alert className={classes.alert} severity="error">
								{error.message}
							</Alert>
						))}

					<form
						onChange={handleChanges}
						onSubmit={handleSubmit}
						className={classes.form}
						noValidate>
						<TextField
							error={errors.includes((er) => er.path[0] === "username")}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="email"
							autoFocus
							value={formData.username}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={formData.password}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}>
							Sign In
						</Button>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
