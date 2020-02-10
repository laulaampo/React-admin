import React from 'react';
import { Layout, Breadcrumb } from 'antd';
// 侧边栏组件
import LeftNav from './left-nav/';
// 头部组件
import HeaderMain from './header-main';
import './index.less';
import { FormattedMessage } from 'react-intl';
import img from '../../asset/img/logo.png';
import withCheckLogin from '../../containers/With-checkLogin/index';
import ThemePicker from './theme-picker';



const { Header, Content, Footer, Sider } = Layout;

@withCheckLogin // 再次包裹此高阶组件 会对所以子组件进行路径/登录状态的验证 因为是先渲染父组件再渲染子组件
class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    isShow: true
  };

  // 收缩侧边栏函数
  onCollapse = collapsed => {
    const { isShow } = this.state;
    this.setState({ collapsed, isShow: !isShow });
  };

  render() {
    const { children } = this.props;
    const { isShow } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="left-nav-logo">
            <img src={img} alt="logo" />
            {/* 根据状态isShow确定文字是否隐藏 通过点击切换侧边栏收缩来更换状态 */}
            <h2 style={{ display: isShow ? 'block' : 'none' }}>
              {/* 需要国际化的文本 都通过 FormattedMessage 组件来展示*/}
              <FormattedMessage id="title" />
            </h2>
          </div>
          <LeftNav />
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 80 }}>
            < HeaderMain />
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        <ThemePicker />
      </Layout>
    );
  }
}
export default BasicLayout;