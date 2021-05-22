import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({});

function Receipt({ handleOpen, handleClose, receiptData }) {
	const classes = useStyles();
	return (
		<div>
			<Dialog
				open={handleOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">
					<h3>Receipt</h3>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Product</TableCell>
									<TableCell align="right">Quantity</TableCell>
									<TableCell align="right">Unit price</TableCell>
									<TableCell align="right">Total</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{receiptData &&
									receiptData.products.map((item) => (
										<TableRow key={item._id}>
											<TableCell component="th" scope="row">
												{item.name}
											</TableCell>
											<TableCell align="right">{item.qty}</TableCell>
											<TableCell align="right">{item.price}</TableCell>
											<TableCell align="right">
												{item.price * item.qty}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						className="c-button c-button-lg c-button-rounded"
						onClick={handleClose}
						size="large"
						color="primary">
						Disagree
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Receipt;
