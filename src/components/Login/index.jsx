import React, { Component } from 'react'
import logo from './logo.png';
import { Form, Icon, Input, Button } from 'antd';
import './index.less'

@Form.create() // 定义修饰器 用Form.create高阶组件出来Login
class Login extends Component {
  validator = (rule,value,callback)=>{
    const reg = /^\w+$/
    const name = rule.field === 'username' ? '用户名' : '密码'
    if(!value){
      callback(`${name}不能为空`);
    }else if(value.length < 3){
      callback(`${name}长度必须大于3位`)
    } else if(value.length > 15){
      callback(`${name}不能大于15位`)
    }else if(!reg.test(value)){
      callback(`${name}只能是数字、字母、下划线的组合`)
    }
      callback()
  }
  render() {
    const {getFieldDecorator} = this.props.form; // 获取 getFieldDecorator 方法 也是高阶函数 ('type',{reuls:[{required:true,message:''}]})(<Componets />)
    const validator = this.validator;

    return (
      <div className='login'>
        <header>
          <img src={logo} alt="logo" />
          <h1>硅谷后台管理系统</h1>
        </header>
        <section className="login-section">
          <h2>用户登录</h2>
          <Form className='form-form'>
            <Form.Item className='login-form'>
              {
                getFieldDecorator('username',{
                  rules:[
                 /*    {
                      required:true,
                      message:'请输入用户名'
                    },
                    {
                      max:8,
                      message:'用户名最长不能超过八位'
                    },
                    {
                        min:4,
                        message:'用户名不能短于四位' 
                    },
                    {
                      pattern:/^\w$/,
                      message:'用户名只能包含数字、字母、下划线'
                    } */
                    {
                      validator:validator
                    }
                  ]
                })(
                  <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />
                )
              } 
            </Form.Item>
            <Form.Item className='login-form'> 
                {
                  getFieldDecorator('password',{
                    rules:[
                      {
                        validator:validator
                      }
                    ]
                  })(<Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />)
                }
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
