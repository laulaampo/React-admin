import React, { Component } from 'react';
import { Card, Table, Button, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { getCategoryAsync, addCotegoryAsync, changeCategoryAsync,deleteCategoryAsync } from '../../redux/actions.js';
import AddCategoryForm from './add-category-form';

@connect((state) => ({
  categories: state.categories // 当前props接收到的categories 为react redux 的state中的ruducers的categories的result
}), {
    getCategoryAsync,
    addCotegoryAsync,
    changeCategoryAsync,
    deleteCategoryAsync
  })
class Category extends Component {
  state = {
    isShow: false,// 是否显示对话框
    category: {}, // 用于判断有无获取当前category信息对象
    // isUpdata: false
  }
  columns = [
    {
      title: '品类名称', // 显示列名字
      dataIndex: 'name', // 需要显示的数组内对象的属性名
    },
    {
      title: '操作',
      // dataIndex:'operation',
      render: (category) => {
        // render方法的参数看dataIndex 如果没写就是整个数据
        return <div>
          {/* 如果是修改函数 则通过render在渲染时传入当前category的数据对象 */}
          <Button type='link' onClick={this.showModal(category)}>修改分类</Button>
          <Button type='link' onClick={this.deleteCategory(category)}>删除分类</Button>
        </div>
      }
    }
  ]

  componentDidMount() {
    if (!this.props.categories.length) {
      // 只有当redux管理的categories数据没有，才会发送请求，请求分类数据
      this.props.getCategoryAsync();
    }
  }

  handleOk = () => {
    this.setState({
      isShow: false
    })
    // 获取子组件表单的输入内容
    const { validateFields, resetFields } = this.addCategoryForm.props.form;
    // 获取当前组件state中的category
    const { category } = this.state;
    validateFields((err, value) => {
      if(!err){
        // 表单输入内容
      const categoryName = value.categoryName;
      // 创建一个空promise对象
      let promise = null;
      if(category.name){ // 如果此时的state中category有内容 说明是修改
        promise = this.props.changeCategoryAsync(this.state.category._id,categoryName);
      } else { // 如果此时的state中category没有内容 说明是添加
        promise = this.props.addCotegoryAsync(categoryName)
      }
      promise
      .then((response)=>{
        message.success(`${category.name ? '修改':'添加'}成功`)
        resetFields();
        this.handleCancel();
      })
      .catch((err)=>{
        message.error(err);
      })
      }
      /* if (isUpdata) {
        if(!err){
          const _id = category._id;
          this.props.changeCategoryAsync(_id,categoryName)
          .then((response)=>{
            message.success('修改分类成功');
          })
          .catch((err)=>{
            message.error(err);
          })
          console.log(categoryName,_id)
        }
      } else {
        if (!err) {
          const categoryName = value.categoryName // 获取表单的值
          this.props.addCotegoryAsync(categoryName) // 发送异步请求添加category 参数是表单的内容即categoryName
            .then(() => {
              message.success('添加分类成功！');
              resetFields(); // 清空表单
              this.handleCancel(); // 关闭对话框
            })
            .catch((err) => {
              message.error('添加分类失败！', err); // 提交错误 显示错误信息
            })
        }
      } */

    })
  }

  handleCancel = () => { // 修改state  隐藏对话框
    this.setState({
      isShow: false
    })
  }

  showModal = (category = {}) => { // 修改state  显示对话框
    return () => {
      this.setState({
        isShow: true,
        category,
        isUpdata: category.name
      })
    }
  }

  // 删除当前category的点击事件
  deleteCategory = (category)=>{ // 传入衣蛾category对象 
      return ()=>{
        Modal.confirm(
          {
            title:`你确定要删除${category.name}分类码`,
            onOk :()=>{
              this.props.deleteCategoryAsync(category._id) // 传id 请求参数
              .then((response)=>{
                message.success('删除成功！')
              })
              .catch((err)=>{
                message.error(err);
              })
            },
            onCancel:()=>{
              this.CategoryForm.props.form.resetFields();
            }
          }
        )
      }
  }
  render() {
    const { categories } = this.props;
    const { category, isUpdata } = this.state;
    // const { validateFields } = this.addCategoryForm.props.form;
    // console.log(this.addCategoryForm.props.form.validateFields)
    return (
      <Card title="分类管理" extra={<Button type="primary" onClick={this.showModal()}> <Icon type="plus" /> 分类列表</Button>}>
        <Table
          columns={this.columns} // 指定表头信息
          bordered // 边框
          dataSource={categories} // 接收数组 要显示的数据
          pagination={{
            defaultPageSize: 3, // 默认每页显示行数
            pageSizeOptions: ['3', '6', '9', '12'], // 每页显示x行 下拉选项
            showSizeChanger: true, // 是否显示改变 pageSize
            showQuickJumper: true // 是否显示快速跳转
          }}
          rowKey='_id' // 每行的key属性
        />
        <Modal
          title={isUpdata ? "修改分类" : "添加分类"}
          visible={this.state.isShow} // 根据state的状态值确定是否响应
          onOk={this.handleOk} // 点击确定回调函数
          onCancel={this.handleCancel} // 单击取消的回调函数
          width={300}
        >
          <AddCategoryForm
            // 给子元素传当前选择对象信息
            categoryName={category.name}
            // 获取子元素内表单的值和方法
            wrappedComponentRef={form => (this.addCategoryForm = form)} />
        </Modal>
      </Card>
    )
  }
}
export default Category;