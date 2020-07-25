import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";

import ARegister from './components/auth/ARegister';
import ALogin from './components/auth/ALogin';
import MLogin from './components/auth/MLogin';

import Login from "./components/auth/Login";

import Dashboard from "./components/dashboard/Dashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import MDashboard from './components/dashboard/MDashboard';


import PrivateRoute from './components/private-route/PrivateRoute';
import PrivateRouteAdmin from './components/private-route/PrivateRouteAdmin';
import PrivateRouteM from './components/private-route/PrivateRouteM';
import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
   
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/customer/register" component={Register} />
            <Route exact path="/customer/login" component={Login} />

            <Route exact path="/admin/register" component={ARegister} />
            <Route exact path="/admin/login" component={ALogin} />

            <Route exact path="/merchant/login" component={MLogin} />
           
         
            <Switch>
              <PrivateRoute exact path="/customer/dashboard" component={Dashboard} />
              <PrivateRouteAdmin exact path="/admin/dashboard" component={AdminDashboard} />  
              <PrivateRouteM exact path="/merchant/dashboard" component={MDashboard} />          </Switch>
              
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
