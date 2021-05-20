import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

function Cart({ cartItems, handleCartCounter }) {
	const URL = process.env.REACT_APP_API_BASE_URL;
	const [settings, setSettings] = useState([]);
	useEffect(() => {
		fetch(`${URL}setting`)
			.then((result) => result.json())
			.then((result) => setSettings(result.data));
	}, []);
	console.log("settings", settings);
	return (
		<div>
			<table class="table">
				<tbody>
					{cartItems.map((item) => (
						<tr>
							<th scope="row">{item.name}</th>
							<td>{item.price}</td>
							<td>
								<RemoveCircleOutlineIcon
									onClick={() => handleCartCounter(item._id, "decrement")}
								/>
								<AddCircleOutlineIcon
									onClick={() => handleCartCounter(item._id, "increment")}
								/>
							</td>
							<td>{item.qty}</td>
							<td>{item.qty * item.price}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h6>Total</h6>{" "}
			{cartItems.length === 0
				? 0
				: cartItems.reduce((total, item) => total + item.qty * item.price, 0)}
		</div>
	);
}

export default Cart;
