import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import queryString from "query-string";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	firstRow: {
		marginTop: "20px",
		marginBottom: "20px",
	},
}));

export default function Users() {
	const classes = useStyles();
	const URL = process.env.REACT_APP_API_BASE_URL;
	const [users, setUsers] = useState([]);
	let [del, setDel] = useState(false);
	let [query, setQuery] = useState({
		sort: "Newest",
		role: "all",
		limit: 20,
		keyword: "",
	});

	const handleDelete = async (id) => {
		Swal.fire({
			title: "Are you sure?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, keep it",
		}).then((result) => {
			setDel(!del);
			if (result.value) {
				fetch(`${URL}user/${id}`, { method: "DELETE" });
				Swal.fire("Deleted!", "User has been deleted!", "success");
			}
		});
	};
	console.log(query);

	const handleQueryChange = (e) => {
		let newQuery = { ...query };
		newQuery[e.target.name] = e.target.value;
		setQuery(newQuery);
	};

	useEffect(() => {
		query = queryString.stringify(query);
		async function getAllUsers() {
			try {
				let response = await fetch(`${URL}user?${query}`);
				response = await response.json();
				setUsers(response.data.users);
			} catch (error) {
				return error;
			}
		}
		getAllUsers();
		console.log(users);
	}, [query, del]);

	return (
		<div>
			<Container>
				<Grid>
					<Grid
						className={classes.firstRow}
						container
						justify="flex-end"
						item
						xs={12}>
						<Button
							align="left"
							size="sm"
							type="submit"
							variant="contained"
							color="primary"
							className="c-button "
							component={Link}
							to="user/">
							New User
						</Button>
					</Grid>
					<form
						onChange={handleQueryChange}
						onSubmit={(e) => {
							e.preventDefault();
						}}>
						<Grid
							container
							className={classes.firstRow}
							justify="flex-end"
							item
							xs={12}>
							<FormControl>
								<Input
									id="standard-adornment-weight"
									endAdornment={
										<InputAdornment position="end">
											<SearchIcon />
										</InputAdornment>
									}
									aria-describedby="standard-weight-helper-text"
									inputProps={{
										name: "keyword",
										"aria-label": "weight",
									}}
								/>
							</FormControl>

							<NativeSelect
								inputProps={{
									name: "role",
									id: "age-native-label-placeholder",
								}}>
								<option value="All">All Role</option>
								<option value="Admin">Admin</option>
								<option value="Cashier">Cashier</option>
							</NativeSelect>
							<NativeSelect
								inputProps={{
									name: "sort",
									id: "age-native-label-placeholder",
								}}
								className="c-rounded">
								<option value="Newest">Newest</option>
								<option value="Oldest">Oldest</option>
								<option value="Name">Name</option>
								<option value="Last Active">Last Active</option>
							</NativeSelect>
						</Grid>
					</form>
					<Grid item={12}>
						<Paper className={classes.paper}>
							<TableContainer className={classes.container}>
								<Table
									aria-label="table"
									className={classes.table}
									aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Full Name</TableCell>
											<TableCell align="left">UserName</TableCell>
											<TableCell align="right">Role</TableCell>
											<TableCell align="right">Last Active</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{users.map((user) => (
											<TableRow key={user._id}>
												<TableCell>{user.fullname}</TableCell>
												<TableCell>{user.username}</TableCell>
												<TableCell align="right">
													<Chip
														label={user.role}
														color={
															user.role === "Admin" ? "secondary" : "primary"
														}
														variant="outlined"
													/>
												</TableCell>
												<TableCell align="right">
													{moment(user.lastActive).format("lll")}
												</TableCell>
												<TableCell align="right">
													<Link to={`user/${user._id}`}>
														<EditIcon />
													</Link>

													<DeleteIcon onClick={() => handleDelete(user._id)} />
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
