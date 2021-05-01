import { Container, Paper, Grid, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";

export default function Category() {
	const URL = process.env.REACT_APP_API_BASE_URL;
	let [formData, setFormData] = useState({});

	const handleFormChange = (e) => {
		let newFormData = { ...formData };
		newFormData[e.target.name] = e.target.value;
		setFormData(newFormData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${URL}category`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		}).then((response) => console.log(response));
	};

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
