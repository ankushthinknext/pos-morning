import { Route, Switch } from "react-router";
import Login from "./components/auth/Login";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
	return (
		<div>
			<Switch>
				<ProtectedRoute path="/dashboard" component={Dashboard} />
				<ProtectedRoute path="/users" component={Dashboard} />
				<ProtectedRoute path="/user/:id?" component={Dashboard} />
				<ProtectedRoute path="/category" component={Dashboard} />
				<ProtectedRoute path="/products" component={Dashboard} />
				<ProtectedRoute path="/transactions" component={Dashboard} />
				<Route path="/login" component={Login} />
			</Switch>
		</div>
	);
}

export default App;
