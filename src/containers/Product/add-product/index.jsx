import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  message
} from 'antd';
// 引入富文本编辑器组件的样式
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import './index.less';
// 引入富文本编辑器组件的样式
import 'braft-editor/dist/index.css';
import {getCategoryAsync} from '../../../redux/actions';
import {connect} from 'react-redux';
import {reqAddProduct} from '../../../api/index';
const { Item } = Form;
const { Option } = Select;

@connect(state=>({categories:state.categories}),{
  getCategoryAsync
})
@Form.create() // 使用From组件的表单验证
class AddProduct extends Component { 
  componentDidMount(){
    if (!this.props.categories.length) {
      // 只有当redux管理的categories数据没有，才会发送请求，请求分类数据
      this.props.getCategoryAsync();
    }
  }
  submit = e=>{ // 提交表单 发送请求
    // 校验表单并且收集数据
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
        const { name, desc, categoryId, price, detail } = values;
        reqAddProduct({
          name,
          desc,
          categoryId,
          price,
          detail: detail.toHTML()
        })
        .then(()=>{
          // 添加成功 提示用户
          message.success('添加商品成功');
        })
        .catch((err)=>{
          // 添加失败 提示错误
          message.error(err);
        })
      } else {
        message.error(err);
      }
    })
  }
  back = () => {
    // 回退到/product
    this.props.history.replace('/product');
  }
  render() {
    const {categories} = this.props; 
    const formItemLayout = {
      labelCol: {
        // 左边文字占的区域大小
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        // 右边区域占的大小
        xs: { span: 24 },
        sm: { span: 8 }
      }
    };
    // 获取表单验证的方法
    const { getFieldDecorator } = this.props.form;
    return (
      <Card title={
        <div>
          <Icon type='arrow-left' className="go-back" onClick={this.back} />
          添加商品
        </div>
      }>
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label='商品名称'>
            {
              getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品名称'
                  }
                ]
              })(<Input placeholder='请输入商品名称' />)
            }
          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator('desc', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品描述'
                  }
                ]
              })(<Input placeholder='请输入商品描述' />)
            }
          </Item>
          <Item label='商品分类'>
            {
              getFieldDecorator('categoryId', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品分类'
                  }
                ]
              })(<Select placeholder="请选择商品分类">
                  {
                    categories.map((category)=>{
                      return (<Option key={category._id} value={category._id}>
                        {category.name}
                      </Option>)
                    })
                  }
                </Select>)
            }

          </Item>
          <Item label="商品价格">
          {
              getFieldDecorator('price', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品价格'
                  }
                ]
              })(<InputNumber
                // 默认值
                // defaultValue={1000}
                // 格式化，当输入值的时候，通过formatter进行格式化。 加上，
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                // 输入时如果不是数字（是字母/中文），删除掉
                parser={value => value.replace(/￥\s?|(,*)/g, '')}
                className='product-price'
              />)
            }
          </Item>
          <Item label='商品详情' wrapperCol={{ span: 22 }}>
          {
              getFieldDecorator('detail', {
                rules: [
                  {
                    required: true,
                    message: '请输入商品详情'
                  }
                ]
              })(<BraftEditor className='product-detail' />)
            }
          </Item>
          <Item>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default AddProduct;