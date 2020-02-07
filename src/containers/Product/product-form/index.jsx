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
import { getCategoryAsync } from '../../../redux/actions';
import { connect } from 'react-redux';
import { reqAddProduct,reqUpdateProduct } from '../../../api/index';
const { Item } = Form;
const { Option } = Select;

@connect(state => ({ categories: state.categories }), {
  getCategoryAsync
})
@Form.create() // 使用From组件的表单验证
class ProductForm extends Component {
  componentDidMount() {
    if (!this.props.categories.length) {
      // 只有当redux管理的categories数据没有，才会发送请求，请求分类数据
      this.props.getCategoryAsync();
    }
  }
  handleCategoryId=(isProductAdd)=>{
    if(isProductAdd){
      // 如果是添加商品 则显示默认分类为0  未分类
      return '0'
    }
    // 获取redux中所有分类数据
    const {categories, location: {state: {categoryId}}} = this.props;
    // 返回值是不确定的
    const category = categories.find((category)=>{
      // 如果找到了商品的分了 则返回商品 如果分类被删除 则返回undefined
      return category._id === categoryId;
    })
    if (category) {
      // 有值，说明找到了，商品分类是存在的
      return categoryId;
    } 

    // 没有值，没有找到，说明商品分类被删除掉了
    return '0';
  }
  submit = e => { // 提交表单 发送请求
    // 校验表单并且收集数据
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let promise = null;
      if (!err) {
        const { name, desc, categoryId, price, detail } = values;
        if(this.isProductAdd()){
          promise = reqAddProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML() // 如果富文本编辑器内容需要的是纯文本 则使用toText
          })
        }else{
          promise = reqUpdateProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML(), // 如果富文本编辑器内容需要的是纯文本 则使用toText
            // productId: this.props.location.state._id // 问题：如果是直接访问，没有state
            productId: this.props.match.params.id
          })
        }
          promise
          .then(() => {
            // 添加成功 提示用户
            message.success(`${this.isProductAdd?'修改':'添加'}商品成功`);
            // 成功后跳转到products中
            this.props.history.replace('/product');
          })
          .catch((err) => {
            // 添加失败 提示错误
            message.error(err);
          })
      } else {
        message.error(err);
      }
    })
  }
  // 判断是添加还是修改
  isProductAdd =()=>{
    // 确定标识 当前是添加还是修改 默认是添加 通过路径名来确认 如果是从外部连接访问 则没有点击product中修改按钮 没有传参
    return this.props.location.pathname.indexOf('updata') === -1;
  }
  
  back = () => {
    // 回退到/product
    this.props.history.push('/product');
  }
  render() {
    const { categories } = this.props;
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
    const {  state } = this.props.location;
 

    return (
      <Card title={
        <div>
          <Icon type='arrow-left' className="go-back" onClick={this.back} />
          {this.isProductAdd() ? '添加商品' : '修改商品'}
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
                ],
                // 表单的初始值initialValue
                initialValue: this.isProductAdd() ? '' : state.name
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
                ],  // 表单的初始值initialValue
                initialValue: this.isProductAdd() ? '' : state.desc
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
                ],  // 表单的初始值initialValue
                initialValue: this.handleCategoryId(this.isProductAdd())
              })(<Select placeholder="请选择商品分类">
                {/* 添加一个默认的option */}
                <Option key='0' value='0'>
                  暂无分类
                </Option>
                {
                  categories.map((category) => {
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
                ],  // 表单的初始值initialValue
                initialValue: this.isProductAdd() ? '' : state.price
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
                ],
                // BraftEditor文档的API 设置富文本编辑器的默认值
              initialValue: this.isProductAdd() ? '' : BraftEditor.createEditorState(state.detail)
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
export default ProductForm;