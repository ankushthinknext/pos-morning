import React, { useEffect, useState, useRef } from "react";
import queryString from "query-string";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Container, TableContainer } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chartjs from "chart.js";
import { monthlyData, weeklyData } from "./chartUtils";

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

export default function Main() {
	const classes = useStyles();
	const URL = process.env.REACT_APP_API_BASE_URL;
	const [dashboardData, setDashboardData] = useState([]);
	const [transactionsData, setTransactionsData] = useState([]);
	const chartContainer = useRef(null);

	const [chartInstance, setChartInstance] = useState(null);

	useEffect(() => {
		let query = {
			limit: 100,
			start: moment().startOf("month"),
			end: moment().endOf("month"),
		};

		query = queryString.stringify(query);
		async function getDashboardData() {
			let response = await fetch(`${URL}transaction/dashboard?${query}`);
			response = await response.json();
			setDashboardData(response.data);
		}
		async function getTransactionData() {
			let response = await fetch(`${URL}transaction?${query}`);
			response = await response.json();
			setTransactionsData(response.data);
			let monthlyTransactions = monthlyData(response.data.transactions);
			let chartConfig = {
				type: "bar",
				data: {
					labels: monthlyTransactions.days,
					datasets: [
						{
							label: "Weekly Transactions",
							data: monthlyTransactions.transactions,
							fill: true,
							backgroundColor: "#f3a8bd",
							tension: 0.1,
						},
					],
				},
				options: {
					// ...
				},
			};
			if (chartContainer && chartContainer.current) {
				const newChartInstance = new Chartjs(
					chartContainer.current,
					chartConfig,
				);
				setChartInstance(newChartInstance);
			}
		}
		getDashboardData();
		getTransactionData();
	}, [chartContainer]);
	console.log(transactionsData);
	return (
		<div>
			<Container maxwidth="sm">
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div className="p-panel p-panel-maroon">
						<h5>{dashboardData.count}</h5>
					</div>
					<div className="p-panel p-panel-indigo">
						<h5>{dashboardData.total}</h5>
					</div>
					<div className="p-panel p-panel-orange">
						<h5>{dashboardData.qty}</h5>
					</div>
				</div>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Paper className={classes.paper}>
							<canvas ref={chartContainer}></canvas>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper className={classes.paper}>
							<TableContainer
								style={{ maxHeight: "500px", overflowY: "scroll" }}
								className={classes.container}>
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
									<TableBody>
										{transactionsData.transactions &&
											transactionsData.transactions.map((tr) => (
												<TableRow key={tr._id}>
													<TableCell component="th" scope="row">
														{tr._id}
													</TableCell>
													<TableCell align="right">
														{moment(tr.createdAt).format("lll")}
													</TableCell>
													<TableCell align="right">{tr.items.length}</TableCell>
													<TableCell align="right">{tr.grandtotal}</TableCell>
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
