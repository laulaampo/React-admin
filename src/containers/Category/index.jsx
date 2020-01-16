import React, { Component } from 'react';
import { Card, Table, Button, Icon,Modal ,message} from 'antd';
import { connect } from 'react-redux';
import {getCategoryAsync,addCotegoryAsync} from '../../redux/actions.js';
import AddCategoryForm from './add-category-form';

@connect((state)=>({
  categories:state.categories // 当前props接收到的categories 为react redux 的state中的ruducers的categories的result
}),{
  getCategoryAsync,
  addCotegoryAsync
})
class Category extends Component {
  state = {
    isShow:false // 是否显示对话框
  }
  columns = [
    {
      title:'品类名称', // 显示列名字
      dataIndex:'name', // 需要显示的数组内对象的属性名
    },
    {
      title:'操作',
      dataIndex:'operation',
      render(){
        return <div>
          <Button type='link'>修改分类</Button>
          <Button type='link'>删除分类</Button>
        </div>
      }
    }
  ]
  
  componentDidMount(){
    this.props.getCategoryAsync();
  }

  handleOk = ()=>{
    this.setState({
      isShow:false 
    })
        const { validateFields ,resetFields} = this.addCategoryForm.props.form;
        validateFields((err,value)=>{
          if(!err){
            const categoryName = value.categoryName // 获取表单的值
            this.props.addCotegoryAsync(categoryName) // 发送异步请求添加category 参数是表单的内容即categoryName
            .then(()=>{
              message.success('添加分类成功！'); 
              resetFields(); // 清空表单
              this.handleCancel(); // 关闭对话框
            })
            .catch((err)=>{
              message.error('添加分类失败！',err); // 提交错误 显示错误信息
            })
          }
        })
  }

  handleCancel = ()=>{ // 修改state  隐藏对话框
    this.setState({
      isShow:false
    })
  }

  showModal = ()=>{ // 修改state  显示对话框
    this.setState({
      isShow:true
    })
  }
  render() {
    const {categories} = this.props;
    // const { validateFields } = this.addCategoryForm.props.form;
    // console.log(this.addCategoryForm.props.form.validateFields)
    return (
        <Card title="分类管理" extra={<Button type="primary" onClick={this.showModal}> <Icon type="plus" /> 分类列表</Button>}>
          <Table
          columns={this.columns} // 指定表头信息
          bordered // 边框
          dataSource={categories} // 接收数组 要显示的数据
          pagination= {{
            defaultPageSize: 3, // 默认每页显示行数
            pageSizeOptions: ['3', '6', '9', '12'], // 每页显示x行 下拉选项
            showSizeChanger: true, // 是否显示改变 pageSize
            showQuickJumper: true // 是否显示快速跳转
           }}
           rowKey='_id' // 每行的key属性
          />
         <Modal
          title="添加分类"
          visible={this.state.isShow} // 根据state的状态值确定是否响应
          onOk={this.handleOk} // 点击确定回调函数
          onCancel={this.handleCancel} // 单击取消的回调函数
          width={300} 
        >
          <AddCategoryForm  // 获取子元素内表单的值和方法
          wrappedComponentRef={form => (this.addCategoryForm = form)}/>
        </Modal>
        </Card>
    )
  }
}
export default Category;