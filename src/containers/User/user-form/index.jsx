import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { validator } from '../../../utils/tools';
const { Item } = Form;
const { Option } = Select;
@Form.create()
class UserForm extends Component {

  static propTypes = {
    roles: PropTypes.array.isRequired,
    crruentUser: PropTypes.object.isRequired,
  };
  isUpdateUser= ()=>{
    // 判断是否修改密码
    return this.props.crruentUser.username?true:false
  }
  render() {
    const {
      form: { getFieldDecorator },
      roles,
      crruentUser: { username, phone, email, password ,roleId}
    } = this.props;

    return (
      <Form wrapperCol={{ span: 15 }} labelCol={{ span: 5 }}>
        <Item label='用户名'>
          {getFieldDecorator('username', {
            rules: [
              // 为了让表单有一个 *
              { required: !this.isUpdateUser(), message: '请输入用户名' },
              // 才是真正校验规则
              {
                validator
              }
            ],
            // 默认值 如果是有则显示 即只有修改用户信息时才显示
            initialValue: this.isUpdateUser() ? username : ''
          })(<Input placeholder='请输入用户名'disabled={this.isUpdateUser() } />)}
        </Item>
        <Item label='密码'>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码' },
              {
                validator
              }
            ],
            // 默认值 如果是有则显示 即只有修改用户信息时才显示
            initialValue: this.isUpdateUser()  ? password : ''
          })(<Input placeholder='请输入密码' />)}
        </Item>
        <Item label='手机号'>
          {getFieldDecorator('phone', {
            rules: [{ required: !this.isUpdateUser(), message: '请输入手机号' }],
            // 默认值 如果是有则显示 即只有修改用户信息时才显示
            initialValue: this.isUpdateUser()  ? phone : ''
          })(<Input placeholder='请输入手机号' disabled={this.isUpdateUser() }/>)}
        </Item>
        <Item label='邮箱'>
          {getFieldDecorator('email', {
            rules: [{ required: !this.isUpdateUser(), message: '请输入邮箱' }],
            // 默认值 如果是有则显示 即只有修改用户信息时才显示
            initialValue: this.isUpdateUser()  ? email : ''
          })(<Input placeholder='请输入邮箱' disabled={this.isUpdateUser() } />)}
        </Item>
        <Item label='所属角色'>
          {getFieldDecorator('roleId', {
            rules: [{ required: !this.isUpdateUser(), message: '请选择角色' }],
           initialValue: roleId // 默认值
          })(
            <Select placeholder='请选择角色' disabled={this.isUpdateUser() }>
              {roles.map(role => {
                return (
                  <Option key={role._id} value={role._id}>
                    {role.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </Item>
      </Form>
    )
  }
}
export default UserForm;