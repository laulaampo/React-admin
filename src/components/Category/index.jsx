import React, { Component } from 'react';
import { Card, Table, Button, Icon } from 'antd';

export default class Category extends Component {
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
          <button type='link'>修改分类</button>
          <button type='link'>删除分类</button>
        </div>
      }
    }
  ]
  render() {
    return (
      <div>
        <Card title="分类管理" extra={<Button type="primary"> <Icon type="plus" /> 分类列表</Button>}>
          <Table
          columns={this.columns} // 指定表头信息
          bordered // 边框
          // dataSource
          pagination= {{
            defaultPageSize: 3,
            pageSizeOptions: ['3', '6', '9', '12'],
            showSizeChanger: true, // 是否显示改变 pageSize
            showQuickJumper: true // 是否显示快速跳转
           }}
          />
        </Card>
      </div>
    )
  }
}
