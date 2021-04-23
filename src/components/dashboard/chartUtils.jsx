import moment from "moment";

function monthlyData(transactions) {
	let monthlyTransactions = {
		days: [],
		transactions: [],
	};
	let startDate = moment().startOf("month");
	let endDate = moment().endOf("month");
	for (let i = startDate; i <= endDate; i.add(1, "d")) {
		let currentDay = i.format("D");
		monthlyTransactions.days.push(currentDay);
		let grandtotal = 0;
		let filtered = transactions.filter(
			(tr) => moment(tr.createdAt).format("D") === currentDay,
		);
		if (filtered.length === 0)
			monthlyTransactions.transactions.push(grandtotal);
		else {
			filtered.forEach((tr) => {
				if (tr.length !== 0) {
					grandtotal += tr.grandtotal;
				}
			});
			monthlyTransactions.transactions.push(grandtotal);
		}
	}
	return monthlyTransactions;
}
function weeklyData(transactions) {
	let monthlyTransactions = {
		days: [],
		transactions: [],
	};
	let startDate = moment().startOf("isoweek");
	let endDate = moment().endOf("isoweek");
	for (let i = startDate; i <= endDate; i.add(1, "d")) {
		let currentDay = i.format("D");
		monthlyTransactions.days.push(currentDay);
		let grandtotal = 0;
		let filtered = transactions.filter(
			(tr) => moment(tr.createdAt).format("D") === currentDay,
		);
		if (filtered.length === 0)
			monthlyTransactions.transactions.push(grandtotal);
		else {
			filtered.forEach((tr) => {
				if (tr.length !== 0) {
					grandtotal += tr.grandtotal;
				}
			});
			monthlyTransactions.transactions.push(grandtotal);
		}
	}
	return monthlyTransactions;
}

export { monthlyData, weeklyData };
