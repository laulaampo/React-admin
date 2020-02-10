import React, { Component } from 'react'
import { Icon, Drawer, Divider, Button } from 'antd'
import { SketchPicker } from 'react-color'
import './index.less'
import { getItem, setItem } from '../../../utils/storage'

// 默认颜色 如果localstorage没有设置过颜色  则使用默认颜色
const initColor = getItem('color') || '#1DA57A';

export default class ThemePicker extends Component {
  state = {
    visible: false,
    // 组件渲染时 以下的值都是localstorage保存的color 确保可以显示之前设置的颜色
    crruentColor: initColor,// 当前选择的颜色
    prevColor: initColor // 原来的颜色 
  }
  componentDidMount() {
    // 创建一个style标签 每次都是修改style标签setStyle的内容 就不用每次都创建新的style标签
    this.setStyle = document.createElement('style');
    // 设置主题颜色 
    this.setColorStyle();
    // 加入到head标签中
    document.querySelector('head').appendChild(this.setStyle)

  }
  // 展开侧边栏
  showModel = () => {
    this.setState({
      visible: true// 是否显示抽屉组件
    })
  }
  // 关闭侧边栏
  onClose = () => {
    const { prevColor } = this.state;
    this.setState({
      visible: false,
      crruentColor: prevColor // 将选中的颜色换成原来的颜色
    })
  }
  // 改变取色板颜色的回调函数 记录现在选择的颜色
  handleChangeComplete = ({ hex }) => {
    // 结构出16进制的颜色名
    this.setState({
      crruentColor: hex
    })
  }
  // 设置颜色的函数
  setColorStyle = () => {
    const { crruentColor } = this.state;
    // 将类名如此的样式背景颜色全部给成crruentColor  每次都是修改style标签setStyle的内容 就不用每次都创建新的style标签
    this.setStyle.innerHTML = ` 
      .ant-menu .ant-menu-item.ant-menu-item-selected, .theme-picker-btn{
        background-color: ${crruentColor} !important;
      }
      .header-main .header-main-top {
        border-bottom: 1px solid ${crruentColor} !important;
      }
      .ant-btn.ant-btn-link {
        color: ${crruentColor} !important;
      }
      .ant-btn.ant-btn-primary {
        background-color: ${crruentColor} !important;
        border-color: ${crruentColor} !important;
      }
    `;
  };
  // 点击确定的回调函数
  onOk = () => {
    // 获取现在选择的颜色
    const { crruentColor } = this.state;
    // 修改颜色
    this.setColorStyle()
    // 将选中的颜色存在localstorage中
    setItem('color', crruentColor)
    this.setState({
      visible: false,// 关闭抽屉组件
      // 将上一次的颜色 设置成修改的颜色
      prevColor: crruentColor
    })
  }
  // 重置主题颜色
  onReset = ()=>{
    this.setState({
      visible:false,
      prevColor:'#1DA57A',
      crruentColor:'#1DA57A'
    })
    // 更改localStorage的color 下次打开也可以是默认色
    setItem('color','#1DA57A')
    // 设置颜色
    this.setColorStyle();
  }

  render() {
    const { visible, crruentColor } = this.state;
    return (
      <div>
        <div className='theme-picker-btn' onClick={this.showModel}>
          <Icon type='setting' />
        </div>
        {/* 侧边栏 */}
        <Drawer
          title='主题颜色选择'
          placement='right'
          visible={visible}>
          <Divider />
          <SketchPicker
            color={crruentColor} // 取色板的颜色
            onChangeComplete={this.handleChangeComplete} // 改变颜色触发的回调函数
          />
          <Divider />
          <Button onClick={this.onClose}>取消</Button> &nbsp;
          <Button onClick={this.onReset}>重置</Button> &nbsp;
          <Button type='primary' onClick={this.onOk} >确认</Button>
        </Drawer>
      </div>
    )
  }
}
