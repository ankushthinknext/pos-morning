async function getAllUsers(url) {
	try {
		let response = await fetch(url);
		response = await response.json();
		return response.data;
	} catch (error) {
		return error;
	}
}

export default getAllUsers;
