import React, { Component } from 'react'
import {Button,Icon} from 'antd';
import './index.less';

export default class HeaderMain extends Component {
  render() {
    return (
      <div className="header-main">
        <div className="header-top">
          <Button size="small">
            <Icon type='fullscreen' />
          </Button>
          <Button size="small">English</Button>
          <span className="sayHi">Hello,admin</span>
          <Button size="small" type="link">退出</Button>
        </div>
        <div className="header-bottom">
          <span className="bottom-left">商品管理</span>
          <span className="bottom-right">2020/1/14 20:58:24</span>
        </div>
      </div>
    )
  }
}
