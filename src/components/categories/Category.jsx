import { Container, Paper, Grid, TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router";

export default function Category(props) {
	const id = useLocation().pathname.split("/")[2];
	const history = useHistory();
	console.log(id);

	console.log("location", useLocation());
	console.log("params", useParams());
	const URL = process.env.REACT_APP_API_BASE_URL;
	let [formData, setFormData] = useState({});
	let [formMethod, setFormMethod] = useState("POST");

	const handleFormChange = (e) => {
		let newFormData = { ...formData };
		newFormData[e.target.name] = e.target.value;
		setFormData(newFormData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${URL}category/${id ? id : ""}`, {
			method: formMethod,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		}).then((response) => {
			props.notification({
				status: "success",
				message: `${
					formMethod === "POST"
						? "Successfully created category"
						: "Successfully updated category"
				}`,
				open: true,
			});
			history.goBack();
		});
	};

	useEffect(() => {
		async function getCategory(id) {
			if (!id) return;
			let response = await fetch(`${URL}category/${id}`);
			response = await response.json();
			if (response.status) {
				setFormData(response.data);
				setFormMethod("PUT");
			}
		}
		getCategory(id);
	}, []);
	console.log(formData);
	console.log(formMethod);

	return (
		<div>
			<Container>
				<h2>Category Form</h2>
				<form onChange={handleFormChange} onSubmit={handleSubmit}>
					<Grid>
						<Grid item xs={12}>
							<Paper style={{ padding: "30px" }}>
								<Grid item xs={12}>
									<TextField
										fullWidth
										required
										name="name"
										id="filled-required"
										label="Category Name"
										variant="filled"
										value={formData.name}
									/>
								</Grid>
								<Grid item style={{ textAlign: "right", marginTop: "30px" }}>
									<Button
										type="submit"
										className="c-button-lg c-button-rounded c-button">
										Submit
									</Button>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</form>
			</Container>
		</div>
	);
}
