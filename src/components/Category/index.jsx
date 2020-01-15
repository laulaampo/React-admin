import React, { Component } from 'react';
import { Card, Table, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import {getCategoryAsync} from '../../redux/actions.js';

@connect((state)=>({
  categories:state.categories // 当前props接收到的categories 为react redux 的state中的ruducers的categories的result
}),{
  getCategoryAsync
})
class Category extends Component {
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
  render() {
    const {categories} = this.props;
    return (
      <div>
        <Card title="分类管理" extra={<Button type="primary"> <Icon type="plus" /> 分类列表</Button>}>
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
        </Card>
      </div>
    )
  }
}
export default Category;