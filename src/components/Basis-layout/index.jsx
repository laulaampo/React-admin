import React from 'react';
import { Layout,  Breadcrumb } from 'antd';
import LeftNav from './left-nav/';
import HeaderMain from '../header-main';
import './index.less';
import img from '../../asset/img/logo.png';



const { Header, Content, Footer, Sider } = Layout;


class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    isShow:true
  };

  onCollapse = collapsed => {
    const { isShow } = this.state;
    this.setState({ collapsed, isShow:!isShow });
  };

  render() {
    const { children } = this.props;
    const { isShow } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="left-nav-logo">
            <img src={img} alt="logo"/>
            {/* 根据状态isShow确定文字是否隐藏 通过点击切换侧边栏收缩来更换状态 */}
            <h2 style={{display:isShow?'block':'none'}}>硅谷后台</h2>
            </div>
            <LeftNav />
        </Sider>
        
        <Layout>
        <Header style={{ background: '#fff', padding: 0, height: 80 }}>
         < HeaderMain />
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout;