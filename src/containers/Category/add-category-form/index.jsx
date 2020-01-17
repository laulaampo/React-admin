import React, { Component } from 'react'
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

@Form.create() // 引入表单的方法
class AddCategoryForm extends Component {
  static propTypes = {
    categoryName:PropTypes.string
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {categoryName} = this.props;
    return (
      <Form>
        <Form.Item label="请输入分类名称"> 
        {/* 表单验证 参数1为表单名 */}
          {
            getFieldDecorator('categoryName',
            {
              rules:[
                {
                  required:true,
                  message:'请输入分类名称'
                }
              ],
              initialValue:categoryName
            })(<Input placeholder="请输入分类名称" />)
          }
        </Form.Item>
      </Form>
    )
  }
}
export default AddCategoryForm;