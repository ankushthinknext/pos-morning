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
			role: "all",
			limit: 20,
		};
		query = queryString.stringify(query);
		async function getUsers() {
			let response = await fetch(`${URL}user?${query}`);
			response = await response.json();
			setUsers(response.data.users);
		}
		getUsers();
	}, []);
	console.log(users);
	return (
		<div>
			<Container maxWidth="sm">
				<Grid container>
					<Grid item={12}>
						<Paper className={classes.paper}>
							<TableContainer className={classes.container}>
								<Table
									stickyHeader
									aria-label="sticky table"
									className={classes.table}
									aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Reciept Number</TableCell>
											<TableCell align="right">Date</TableCell>
											<TableCell align="right">Qty</TableCell>
											<TableCell align="right">Total</TableCell>
										</TableRow>
									</TableHead>
									<TableBody></TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
