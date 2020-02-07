import React, { Component } from 'react'
import { Card, Icon, Descriptions } from 'antd'

class ProductLook extends Component {
  // 回退
  state = { categoryName: '' }
  back = () => {
    this.props.history.push('/product');
  }

  render() {
    // 获取通过路由传过来的商品详细数据product 等于这里的this.props.location.state
    const { state } = this.props.location;
    // console.log(state.categoryName)
    return (
        <Card title={<div>
          <Icon type='arrow-left' className="go-back" onClick={this.back} />
          商品详情
      </div>}
      >
          <Descriptions bordered>
        <Descriptions.Item label="商品名称">{state.name}</Descriptions.Item>
            <Descriptions.Item label="商品描述">{state.desc}</Descriptions.Item>
            <Descriptions.Item label="商品价格">{`￥${state.price}`}</Descriptions.Item>
            <Descriptions.Item label="商品分类">{state.categoryName.length===0?'暂无分类':state.categoryName[0].name}</Descriptions.Item>
            <Descriptions.Item label="商品状态" span={2}>{state.status === 1 ? '已下架' : '已上架'}</Descriptions.Item>
            <Descriptions.Item label="商品详情" dangerouslySetInnerHTML={{__html:this.state.html}} >
              {state.detail}
            </Descriptions.Item>
          </Descriptions>
      </Card>

    )
  }
}
export default ProductLook;