/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import menus from '../../../config/meaus.js';
import { Link ,withRouter} from 'react-router-dom';
const { SubMenu, Item } = Menu;
@withRouter
 class LeftNav extends Component {

  createMenus = menus => {
    return menus.map((menu => {
      if (menu.children) { // 存在属性children 即有二级菜单
        return <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.title}</span>
            </span>
          }
        >
          {menu.children.map(cMenu => this.createMeausItem(cMenu))}
        </SubMenu>

      } else { // 以及菜单
        return this.createMeausItem(menu);
      }
    }))
  }

  createMeausItem = menu => {
    return <Item key={menu.path}>
        <Link to={menu.path}>
        <Icon type={menu.icon} />
        <span>{menu.title}</span>
        </Link>
      </Item>

  }

  findOpenKey = (menus,pathname)=>{
    const menu = menus.find(menu=>{ 
       if(menu.children){ // 进入二级菜单内
       return  menu.children.find((cMenu)=>{
         return cMenu.path === pathname
       })
      }
    })
    if(menu){ // 如果找到了 返回这个path
      return menu.path
    }
  }

  render() {
    // const {pathname} = this.props.location;
    const { pathname } = this.props.location;
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