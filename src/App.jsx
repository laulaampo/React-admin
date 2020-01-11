import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

export default class App extends Component {
  render() {
    return <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Login" exact component={Login} />
      </Switch>
    </Router>

  }
}
