/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import menus from '../../../config/meaus.js'; // 引入导航信息数据 is an Array
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux'
const { SubMenu, Item } = Menu;
@withRouter // 包裹一层高阶函数withRouter 使当前组件获得三大属性match location history 可以修改url路径
@connect(state => ({ roleMenu: state.user.user.menus })) // 获取权限管理当前用户的menus 即可访问路径()
class LeftNav extends Component {

  createMenus = menus => {
    return menus.map((menu => { // map遍历
      if (menu.children) { // 存在属性children 即有二级菜单
        return <SubMenu
          key={menu.path} // 用path属性当做key 方便根据点击的nav修改url路径
          title={
            <span>
              <Icon type={menu.icon} />
              <FormattedMessage id={menu.title} />
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
          <span>
            <FormattedMessage id={menu.title} />
          </span>
      </Link>
    </Item>

  }

  findOpenKey = (menus, pathname) => {
    const menu = menus.find(menu => {
      if (menu.children) { // 进入二级菜单内
        return menu.children.find((cMenu) => cMenu.path === pathname)
        //  find方法只有Boolean为true才会返回值 否则返回undefined
      }
    })
    if (menu) { // 如果找到了 返回这个path (匹配到了当前url的path 作为初始展开的菜单项) 返回父级的path
      return menu.path
    }
  }

  render() {
    // const {pathname} = this.props.location;
    let { pathname } = this.props.location;
    if (pathname === '/product/add') {
      // 为了默认选中和展开子菜单 如果pathname为/products/add 则强制修改为/products
      pathname = '/product'
    }

    // 获取用户的权限
    const roleMenus = this.props.roleMenu;
    // 用全部menus来与当前用户权限管理包含的roleMenus进行对比 去掉不包含的渲染对象 并且检查子菜单
    const filterMenus = menus.reduce((pre, item) => {
      // 当前遍历的item需要进行深克隆 否则会影响原数据
      item = JSON.parse(JSON.stringify(item));
      // 如果有二级子菜单 则再进行遍历
      if (roleMenus.indexOf(item.path) !== -1 || item.children) {
        if (item.children) {
          // 遍历子菜单 查看哪些子菜单可以显示 如果权限列表roleMenus中包含的子菜单返回true 不包含返回false 被过滤
          const children = item.children.filter(item => {
            return roleMenus.indexOf(item.path) !== -1;
          })
          // 如果过滤之后是空数组 则也不显示子菜单
          if (!children.length) {
            return pre;
          }
          // 修改一级菜单的子菜单
          item.children = children;
        }
        // 符合权限规则的meuns添加入每次都返回的数组中 最终得到新数组---->用于显示的数组 
        pre.push(item)
      }
      // 进入下一次循环
      return pre;
    }, [])
    console.log(filterMenus)
    return (
      <Menu theme="dark" // 默认主题颜色
        defaultSelectedKeys={[pathname]} // 默认选中的菜单
        defaultOpenKeys={[this.findOpenKey(filterMenus, pathname)]} // 初始展开的菜单项
        mode="inline">
        {this.createMenus(filterMenus)}
      </Menu>
    )
  }
}
export default LeftNav;