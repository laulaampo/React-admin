import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/index';
import Home from './components/Home';
import BasicLayout from './components/Basis-layout';
import {connect} from 'react-redux';
// 国际化包
import { IntlProvider } from 'react-intl';
// 语言包
import { en, zhCN } from './locales';
import { ConfigProvider } from 'antd';
import './App.less';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';

@connect(state =>({
  language:state.language
}),null)
 class App extends Component {

  render() {
  

    // const lauguage =  navigator.language || navigators[0] || 'zh-CN'; // 从navigator获取当前浏览器默认语言 如果没有则默认是中文'zh-CN'
    const {language} = this.props;

    const messages = language === 'en' ? en :zhCN; // 根据language选择语言 如果是英语则使用en语言包 否则使用zhCN语言包 
    // ConfigProvider处理antd组件的国际化 IntlProvider处理自定义文字的国际化
    const isEn = language === 'en';
    return <ConfigProvider 
    locale={isEn ? en_US : zh_CN}>

      <IntlProvider 
    locale={language} //选择语言
     messages={messages} // 选择语言包
     >
      <Router>
        <Switch>
          <Route path='/login' exact component={Login} />
          <BasicLayout>
            <Route path='/' exact component={Home} />
          </BasicLayout>
        </Switch>
      </Router>
    </IntlProvider>
     </ConfigProvider>
    
    
  }
}
export default App;