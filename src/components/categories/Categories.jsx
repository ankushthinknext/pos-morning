import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

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
export default function Categories() {
	const classes = useStyles();
	const URL = process.env.REACT_APP_API_BASE_URL;

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		async function getAllCategories() {
			let response = await fetch(`${URL}category`);
			response = await response.json();
			setCategories(response.data.categories);
		}
		getAllCategories();
	}, []);

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure you want to delete this category?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes",
			cancelButtonText: "No",
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
		}).then((result) => {
			if (result.value) {
				fetch(`${URL}category/${id}`, { method: "DELETE" });
				Swal.fire(
					"Deleted!",
					"Your imaginary file has been deleted.",
					"success",
				);
			} else if (result.dismiss === Swal.DismissReason.cancel) {
			}
		});
	};

	console.log(categories);
	return (
		<div>
			<Container>
				<h2>Categories</h2>
				<Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell align="left">Name</TableCell>
										<TableCell align="left">Updated At</TableCell>
										<TableCell align="left"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{categories.map((category) => (
										<TableRow key={category._id}>
											<TableCell aligh="left">{category.name}</TableCell>
											<TableCell align="left">{category.updatedAt}</TableCell>
											<TableCell align="right">
												<Link to={`category/${category._id}`}>
													<EditIcon />
												</Link>
												<DeleteIcon
													onClick={() => handleDelete(category._id)}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
