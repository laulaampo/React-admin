import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/index';
import BasicLayout from './components/Basis-layout';
import { connect } from 'react-redux';
// 国际化包
import { IntlProvider } from 'react-intl';
// 语言包
import { en, zhCN } from './locales';
import { ConfigProvider } from 'antd';
import './App.less';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';
import routes from './config/routes';

@connect(state => ({
  language: state.language, user: state.user.user
}), null)
class App extends Component {

  render() {

    // const lauguage =  navigator.language || navigators[0] || 'zh-CN'; // 从navigator获取当前浏览器默认语言 如果没有则默认是中文'zh-CN'
    const { language, user } = this.props;

    const messages = language === 'en' ? en : zhCN; // 根据language选择语言 如果是英语则使用en语言包 否则使用zhCN语言包 
    // ConfigProvider处理antd组件的国际化 IntlProvider处理自定义文字的国际化
    const isEn = language === 'en'; // 如果是英文返回true
    // 过滤后的路由信息 使不符合权限的页面不能通过修改url访问
    let filterRoutes = [];
    if (user) { // 如果是登录状态
      // 获取用户权限数据
      const roleMenus = user.menus;
      // 对比用户权限和总的路由数据
      filterRoutes = routes.filter(route => {
        return roleMenus.find(item => {
          // 只有符合当前用户权限 以及 product 以及 用户权限开头的路由才能被渲染
          return route.path === item || (item === 'product' && route.path.startsWith(item));
        })
      })
    }
    return <ConfigProvider
      locale={isEn ? en_US : zh_CN}>
      {/* 为antd组件选择语言包↑ */}

      <IntlProvider
        locale={language} //选择语言
        messages={messages} // 选择语言包
      >
        <Router>
          <Switch>
            <Route path='/login' exact component={Login} />
            <BasicLayout>
              {/* <Route path='/' exact component={Home} /> 

            通过遍历路由组件的集合数组生成路由组件 使每次点击都会切换只显示一个路由组件
            switch只能作用于一层子元素
          */}
              <Switch>
                {
                  filterRoutes.map((route) => {
                    return <Route {...route} key={route.path} />
                  })
                }
              </Switch>
            </BasicLayout>
          </Switch>
        </Router>
      </IntlProvider>
    </ConfigProvider>


  }
}
export default App;