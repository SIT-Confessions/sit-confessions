import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ComposeConfession from "./components/Confessions/ComposeConfession";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import { Helmet } from "react-helmet";
import Login from "./components/Admin/Login";
import PrivateRoute from "./components/Routing/PrivateRoute";
import AdminHome from "./components/Admin/Dashboard";
import AccountSettings from "./components/Admin/Account/AccountSettings";
import Users from "./components/Admin/Users";
import RegisterUser from "./components/Admin/RegisterUser";
import ViewConfession from "./components/Confessions/ViewConfession";
import NotificationCenter from "./components/Notifications/NotificationCenter";
import { loadUser } from "./actions/auth";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

function App() {
  const notificationsData = useSelector((state) => state.notifications);
  const isDark = useSelector((state) => state.darkPreferred);

  useEffect(() => {
    store.store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Helmet>
        {isDark === false ? (
          <meta name="theme-color" content="#7E22CE" />
        ) : (
          <meta name="theme-color" content="#5B21B6" />
        )}
        {isDark && <html className="dark" />}
        <body className="transition-colors duration-500 bg-gray-50 dark:bg-dark-gray" />
      </Helmet>
      <div className="sticky top-0 z-30">
        <Navbar isDark={isDark}></Navbar>
      </div>
      <div className="container mx-auto py-10">
        <NotificationCenter data={notificationsData.notifications} />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/post" exact component={ComposeConfession}></Route>
          <Route
            path="/confession/:id"
            exact
            component={ViewConfession}
          ></Route>
          <PrivateRoute
            key="dashboard"
            path="/dashboard"
            exact
            component={AdminHome}
          />
          <PrivateRoute
            key="account"
            path="/account"
            exact
            component={AccountSettings}
          />
          <PrivateRoute key="users" path="/users" exact component={Users} />
          <PrivateRoute
            key="register"
            path="/register-user"
            exact
            component={RegisterUser}
          />
          <Route path="/login" exact component={Login}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
