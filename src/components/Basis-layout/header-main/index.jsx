import React, { Component } from 'react'
import { Button, Icon,Modal } from 'antd';
import screenfull from 'screenfull';
import './index.less';
import {connect} from 'react-redux';
import {removeItem} from '../../../utils/storage';
import {removeUser,changeLanguage} from '../../../redux/actions';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import meaus from '../../../config/meaus.js';
import dayjs from 'dayjs'

@injectIntl
// 引入redux中 user的username(如果没登入则不获取) 以及登出的方法
@connect(state =>({
  username:state.user.user && state.user.user.username,
  language:state.language
}),{
  removeUser,
  changeLanguage
})
// 包裹一层高阶组件withRouter 使其可以获取route的三大属性(history,match,location) 用来修改url
@withRouter
 class HeaderMain extends Component {
  state = { // 根据是否全屏修改状态
    isScreeFull: false,
    time:Date.now() // 状态time 等于当前时间戳
  }
  handleScreenFullChange = ()=>{
    this.setState({
      isScreeFull : !this.state.isScreeFull
    })
  }
  componentDidMount() {
    // 组件挂在后 监听screnfull的变化 变化则改变 监听函数为this.handleScreenFullChange
    screenfull.on('change', this.handleScreenFullChange);
    this.intervalId = setInterval(() => {
      this.setState({
        time:Date.now() // 获取当前时间戳 修改state中的时间戳 每秒一次 更新state重新渲染组件时间
      })
    }, 1000);
  }
  componentWillUnmount() {
    // 组件关闭之前 解绑函数 清除内存
    screenfull.off('change',this.handleScreenFullChange)
    clearInterval(this.intervalId); // 清楚定时器
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

  // 切换中英文
  changeLanguage =()=>{
    
    const language = this.props.language === 'en'? 'zh-CN' : 'en';
    this.props.changeLanguage(language);
  }

  findTitle = (meaus,pathname)=>{
    for(let i =0;i<meaus.length;i++){
      const meau = meaus[i]
      if(meau.children){
        for(let i =0;i<meau.children.length;i++){
          const cMeau = meau.children[i];
          // 如果pathname是 /product 返回 product
          // 如果pathname是 /product/add 返回 product
          // cMenu.path是 /product
          if (pathname.indexOf(cMeau.path) !== -1) {
            return cMeau.title;
          }
        }
      }
      if(meau.path === pathname){
        return meau.title;
      }
    }
  }

  render() {
    const { isScreeFull ,time} = this.state;
    const {username,language,location:{pathname}} = this.props;
    const title = this.findTitle(meaus,pathname);
    return (
      <div className="header-main">
        <div className="header-top">
          <Button size="small" onClick={this.screenFull}>
            <Icon type={isScreeFull ? 'fullscreen-exit' : 'fullscreen'} />
          </Button>
          <Button size="small" onClick={this.changeLanguage}>{language === 'en'?'中文':'Engelish'
          // 切换国际化功能的按钮
        }</Button>
          <span className="sayHi">Hello,{username}</span>
          <Button size="small" type="link" onClick={this.logout}>退出</Button>
        </div>
        <div className="header-bottom">
          <span className="bottom-left">
            <FormattedMessage id={title}/>
          </span>
          <span className="bottom-right">
            {
              // 使用dayjs库处理实时时间 传入一个time状态 自动格式化渲染
              dayjs(time).format('YYYY/MM/DD HH:mm:ss ') 
            }
          </span>
        </div>
      </div>
    )
  }
}
export default HeaderMain;