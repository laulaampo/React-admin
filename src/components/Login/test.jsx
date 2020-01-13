import React, { Component } from 'react'
import axios from 'axios';
import { message } from 'antd';

export default class Test extends Component {
  // 配置axios拦截器

  /*
    拦截器：
      是一个拦截请求/响应的函数
      作用：
        作为请求拦截器：设置公共的请求头 / 参数...
        作为响应拦截器：
      执行流程；
        1. 执行请求拦截器函数
        2. 发送请求
        3. 执行响应拦截器函数（接受到了响应）
        4. 执行 axiosInstance().then()/catch() 

    axios发送POST请求，
      默认的content-type： application/json 请求体是json
      有可能发送POST请求，需要的Content-type是 application/x-www-form-urlencoded

  */
  token = '';
  id = '';
  handleClick1 = () => {
    axios({
      method: 'POST',
      url: '/api/login',
      data: {
        username: 'admin',
        password: 'admin'
      }
    })
      .then((response) => {
        console.log(response);
        if (response.data.status === 0) {
          this.token = response.data.data.token;
          message.success('登录成功，你好admin');
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error('网络错误');
      })
  }
  handleClick2 = () => {
    axios({
      method: 'POST',
      url: '/api/category/add',
      data: {
        categoryName: '手机'
      },
      headers: {
        authorization: `Bearer ${this.token}`
      }
    })
      .then((response) => {
        console.log(response);
        if (response.data.status === 0) {
          this.id = response.data.data._id;
          message.success('添加分类成功');
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error('网络错误');
      })
  }
  handleClick3 = () => {
    axios({
      method: 'POST',
      url: '/api/category/delete',
      data: {
        categoryId: this.id
      },
      headers: {
        authorization: `Bearer ${this.token}`
      }
    })
      .then((response) => {
        console.log(response);
        if (response.data.status === 0) {
          this.id = response.data.data._id;
          message.success('删除分类成功');
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error('网络错误');
      })
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick1}>请求1</button>
        <button onClick={this.handleClick2}>请求2</button>
        <button onClick={this.handleClick3}>请求3</button>
      </div>
    )
  }
}
