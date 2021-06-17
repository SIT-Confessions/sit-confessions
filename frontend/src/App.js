import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ConfessionForm from "./components/Confessions/ConfessionForm";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import { Helmet } from "react-helmet";
import Login from "./components/Admin/Login";
import PrivateRoute from "./components/Routing/PrivateRoute";
import AdminHome from "./components/Admin";
import Account from "./components/Admin/Account";
import Users from "./components/Admin/Users";
import NotificationCenter from "./components/UI/NotificationCenter";
import { loadUser } from "./actions/auth";
import store from "./store";

function App() {
  const notificationsData = useSelector((state) => state.notifications);
  const isDark = useSelector((state) => state.darkPreferred);
  // const isDark = localStorage.getItem("darkPreferred")

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Helmet>
        {isDark === false ? null : <html className="dark" />}
        <body className="transition-colors duration-500 bg-gray-50 dark:bg-dark-gray" />
      </Helmet>
      <Navbar isDark={isDark}></Navbar>
      <div className="container mx-auto py-10">
        <NotificationCenter data={notificationsData.notifications} />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/post" exact component={ConfessionForm}></Route>
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
            component={Account}
          />
          <PrivateRoute
            key="users"
            path="/users"
            exact
            component={Users}
          />
          <Route path="/login" exact component={Login}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
