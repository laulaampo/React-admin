import React, { Component } from 'react';
import withCheckLogin from '../../containers/With-checkLogin/index';


@withCheckLogin
class Home extends Component {
  render() {
    return (
      <div>
        Home...
      </div>
    )
  }
}
export default Home;