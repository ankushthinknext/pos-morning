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

export default function Users() {
	const classes = useStyles();
	const URL = process.env.REACT_APP_API_BASE_URL;
	const [users, setUsers] = useState([]);
	useEffect(() => {
		let query = {
			sort: "Newest",
			role: "all",
			limit: 20,
		};
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
	}, []);
	console.log(users);
	return (
		<div>
			<Container>
				<Grid>
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
											<TableRow key={user.fullname}>
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
													<EditIcon />
													<DeleteIcon />
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
