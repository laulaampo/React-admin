import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd';
import {reqGetProductList} from '../../api/index';
export default class Product extends Component {
  state = {
    ProductList : [], // 初始化product列表
    total:0 // 初始化总数
  }
  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '商品价格',
      dataIndex: 'price'
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      render: () => {
        return (
          <div>
            <Button type='primary'>上架</Button>
            <span>已下架</span>
          </div>
        );
      }
    },
    {
      title: '操作',
      dataIndex: 'xxx',
      render: () => {
        return (
          <div>
            <Button type='link'>详情</Button>
            <Button type='link'>修改</Button>
          </div>
        );
      }
    }
  ];
  
  /* 
    pramas
    pageNum:页数
    pageSize:每页数量
  */
  getProducrList = (pageNum,pageSize)=>{
    reqGetProductList(pageNum,pageSize) // 发送请求
    .then((response)=>{
      this.setState({
        ProductList:response.list, // 修改默认状态为请求状态
        total:response.total
      })
      message.success('获取商品列表成功');
    })
    .catch((err)=>{
      message.error(err);
    })
  }
  // 跳转到添加商品组件
  showAddProduct = ()=>{
    this.props.history.push('/product/add')
  }
  componentDidMount(){ // 组件渲染后 请求商品数据 默认是一页 三个
    this.getProducrList(1,3);
  }

  render() {
    const {total,ProductList} = this.state;
    return (
      <Card
        title={
          <div>
            <Select defaultValue='1'>
              <Select.Option value='1'>根据商品名称</Select.Option>
              <Select.Option value='2'>根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder='关键字'
              style={{ width: 200, margin: '0 10px' }}
            />
            <Button type='primary'>搜索</Button>
          </div>
        }
        extra={
          <Button type='primary' onClick={this.showAddProduct}>
            <Icon type='plus' />
            添加商品
          </Button>
        }>
        <Table
          columns={this.columns} // 表头格式
          dataSource={ProductList} // 数据源数组
          bordered
          pagination={
            {
              pageSizeOptions: ['3', '6', '9', '12'],
              defaultPageSize: 3,
              showSizeChanger: true, // 是否可以快速跳转至某页  
              showQuickJumper: true, // 是否可以改变 pageSize
              total, // 总数 为状态中的总数
              onChange:this.getProducrList,// 变化时的回调函数
              onShowSizeChange:this.getProducrList, // 显示尺寸改变时的回调函数
            }
          }
          rowKey = '_id'
        />
      </Card>
    )
  }
}
