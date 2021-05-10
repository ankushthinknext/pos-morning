import React from "react";

function Cart({ cartItems }) {
	return (
		<div>
			<table class="table">
				<tbody>
					{cartItems.map((item) => (
						<tr>
							<th scope="row">{item.name}</th>
							<td>{item.price}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Cart;
