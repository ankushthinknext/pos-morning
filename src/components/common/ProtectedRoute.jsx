import React from "react";
import { Redirect, Route } from "react-router";

export default function ProtectedRoute({ component: Component, ...rest }) {
	if (localStorage.getItem("token"))
		return <Route {...rest} render={() => <Component />} />;
	return <Redirect to="/login" />;
}
