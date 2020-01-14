import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/index';
import Home from './components/Home';
import BasicLayout from './components/Basis-layout';
import './App.less';

export default class App extends Component {
  render() {
    return <Router>
      <Switch>
      <Route path='/login' exact component={Login} />
        <BasicLayout>
          <Route path='/' exact component={Home} />
        </BasicLayout>
      </Switch>
    </Router>

  }
}
