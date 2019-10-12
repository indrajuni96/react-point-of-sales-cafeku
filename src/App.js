import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from "react-redux";
import './App.css';
import Dashboard from './Screens/Dashboard'
import History from './Screens/History'
import Login from './Screens/Login'
import Logout from './Screens/Logout'
import Register from './Screens/Register'
import store from "./public/redux/store"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/history" component={History} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
      </Router>
    </Provider>
  );
}

export default App;