import React, { Component } from 'react'
import { Button, Icon,Modal } from 'antd';
import screenfull from 'screenfull';
import './index.less';
import {connect} from 'react-redux';
import {removeItem} from '../../../utils/storage';
import {removeUser} from '../../../redux/actions';
import { withRouter } from 'react-router-dom';

// 引入redux中 user的username(如果没登入则不获取) 以及登出的方法
@connect(state =>({username:state.user.user && state.user.user.username}),{
  removeUser
})
// 包裹一层高阶组件withRouter 使其可以获取route的三大属性(history,match,location) 用来修改url
@withRouter
 class HeaderMain extends Component {
  state = { // 根据是否全屏修改状态
    isScreeFull: false
  }
  handleScreenFullChange = ()=>{
    this.setState({
      isScreeFull : !this.state.isScreeFull
    })
  }
  componentDidMount() {
    // 组件挂在后 监听screnfull的变化 变化则改变 监听函数为this.handleScreenFullChange
    screenfull.on('change', this.handleScreenFullChange);
  }
  componentWillUnmount() {
    // 组件关闭之前 解绑函数 清除内存
    screenfull.off('change',this.handleScreenFullChange)
  }

  // 全屏点击事件 切换全屏状态
  screenFull = () => {
    screenfull.toggle();
    /* this.setState({
      isScreeFull: !this.state.isScreeFull
    }) */
  }

  // 登出
  logout = ()=>{
    Modal.confirm({
      title:'您确认要退出登录吗?',
      onOk:()=>{
        removeItem('user'); // 删除localstorage中的user数据
        this.props.removeUser(); // 删除redux中的user数据
        this.props.history.replace('/login');
      }
    })
  }

  render() {
    const { isScreeFull } = this.state;
    const {username} = this.props;
    return (
      <div className="header-main">
        <div className="header-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreeFull ? 'fullscreen-exit' : 'fullscreen'} />
          </Button>
          <Button size="small">English</Button>
          <span className="sayHi">Hello,{username}</span>
          <Button size="small" type="link" onClick={this.logout}>退出</Button>
        </div>
        <div className="header-bottom">
          <span className="bottom-left">商品管理</span>
          <span className="bottom-right">2020/1/14 20:58:24</span>
        </div>
      </div>
    )
  }
}
export default HeaderMain;