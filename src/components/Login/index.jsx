import React, { Component } from 'react'
import logo from './logo.png';
import { Form, Icon, Input, Button } from 'antd';
import './index.less'

// @Form.create(Login)
class Login extends Component {
  render() {
    return (
      <div className='login'>
        <header>
          <img src={logo} alt="logo" />
          <h1>硅谷后台管理系统</h1>
        </header>
        <section className="login-section">
          <h2>用户登录</h2>
          <Form >
            <Form.Item className='login-form'>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item className='login-form'>
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item className='login-form'>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Login;
