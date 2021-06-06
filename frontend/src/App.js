import { useState, useEffect } from "react";
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
import Toast from "./components/UI/Toast";

function App() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    //Do Something
  });

  return (
    <Router>
      <Helmet>
        {isDark === false ? <html className="" /> : <html className="dark" />}
        <body className="bg-gray-50 dark:bg-dark-gray" />
      </Helmet>
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode}></Navbar>
      <div className="container mx-auto py-10">
        <Toast />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route
            path="/post-confession"
            exact
            component={ConfessionForm}
          ></Route>
          <PrivateRoute path="/dashboard" exact component={AdminHome}></PrivateRoute>
          <Route path="/login" exact component={Login}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
