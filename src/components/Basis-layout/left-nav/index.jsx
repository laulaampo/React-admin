/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import menus from '../../../config/meaus.js'; // 引入导航信息数据 is an Array
import { Link ,withRouter} from 'react-router-dom';
import {  FormattedMessage} from 'react-intl';
const { SubMenu, Item } = Menu;
@withRouter // 包裹一层高阶函数withRouter 使当前组件获得三大属性match location history 可以修改url路径
 class LeftNav extends Component {

  createMenus = menus => {
    return menus.map((menu => { // map遍历
      if (menu.children) { // 存在属性children 即有二级菜单
        return <SubMenu
          key={menu.path} // 用path属性当做key 方便根据点击的nav修改url路径
          title={
            <span>
              <Icon type={menu.icon} /> 
              <FormattedMessage id={menu.title}/>
            </span>
          }
        >
          {/* 里面的二级菜单也遍历渲染 */}
          {menu.children.map(cMenu => this.createMeausItem(cMenu))} 
        </SubMenu>

      } else { // 一级菜单
        return this.createMeausItem(menu);
      }
    }))
  }

  createMeausItem = menu => { // 传入单个nav的数据对象
    return <Item key={menu.path}>
      {/* key为menu.path 方便进行url操作  Link可以使点击的nav将url修改成指定的url*/}
        <Link to={menu.path}> 
        <Icon type={menu.icon} />
        <FormattedMessage id={menu.title}/>
        </Link>
      </Item>

  }

  findOpenKey = (menus,pathname)=>{
    const menu = menus.find(menu=>{ 
       if(menu.children){ // 进入二级菜单内
       return  menu.children.find((cMenu)=>cMenu.path === pathname)
      //  find方法只有Boolean为true才会返回值 否则返回undefined
      }
    })
    if(menu){ // 如果找到了 返回这个path (匹配到了当前url的path 作为初始展开的菜单项) 返回父级的path
      return menu.path
    }
  }

  render() {
    // const {pathname} = this.props.location;
    let { pathname } = this.props.location;
    if(pathname === '/product/add'){
      // 为了默认选中和展开子菜单 如果pathname为/products/add 则强制修改为/products
      pathname = '/product'
    }
    return (
      <Menu theme="dark" // 默认主题颜色
      defaultSelectedKeys={[pathname]} // 默认选中的菜单
      defaultOpenKeys={[this.findOpenKey(menus,pathname)]} // 初始展开的菜单项
      mode="inline">
        {this.createMenus(menus)}
      </Menu>
    )
  }
}
export default LeftNav;