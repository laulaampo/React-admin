import React, { Component } from 'react'
import logo from '../../asset/img/logo.png';
import { Form, Icon, Input, Button ,message} from 'antd';
import './index.less';
import { connect } from 'react-redux';
import { saveUserAsync } from '../../redux/actions';
import withCheckLogin from '../../containers/With-checkLogin';
import{validator}from '../../utils/tools'

const { Item } = Form;

// 文档 https://ant.design/components/form-cn/#components-form-demo-dynamic-rule
@withCheckLogin
@connect(null,{
  saveUserAsync
})
@Form.create() // 定义修饰器 用Form.create高阶组件出来Login
class Login extends Component {


  login = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        // 表单校验成功 拿到表单值
        const {username,password} = values;
        //#region 
/*         // 发送axios请求
        axios.post('/api/login',{username,password})
        .then((responese)=>{
          console.log(responese.data.msg);
          // 请求成功 获得responese
          if(responese.data.status === 0){
            // 登录成功 跳转到Home组件
            this.props.history.replace('/');
          } else {
            // 登录失败
            message.error(responese.data.msg);
            // 清空密码
            this.props.form.resetFields(['password']);
          }
        })
        .catch((err)=>{
          console.log(err);
          // 请求失败
          message.error('网错错误，请重新登录');
          // 清空密码
          this.props.form.resetFields(['password']);
        }) */
        //#endregion
       
      // 获取请求函数的返回值 返回的是一个promise对象 
        const result = this.props.saveUserAsync(username,password);
        result
        .then(()=>{ // 登录成功跳转
          this.props.history.replace('/');
        })
        .catch(err=>{ // 登录失败输出错误
          message.error(err);
        })
      } 
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form; // 获取 getFieldDecorator 方法 也是高阶函数 ('type',{reuls:[{required:true,message:''}]})(<Componets />)
    

    return (
      <div className='login'>
        <header>
          <img src={logo} alt="logo" />
          <h1>硅谷后台管理系统</h1>
        </header>
        <section className="login-section">
          <h2>用户登录</h2>
          <Form className='form-form' onSubmit={this.login}>
            <Item className='login-form'>
              {
                getFieldDecorator('username', {
                  rules: [
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
                      validator: validator
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                  />
                )
              }
            </Item>
            <Item className='login-form'>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      validator: validator
                    }
                  ]
                })(<Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="请输入密码"
                />)
              }
            </Item>
            <Item className='login-form'>
              <Button type="primary" className="login-form-button" htmlType="submit" >
                登录
             </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Login;
