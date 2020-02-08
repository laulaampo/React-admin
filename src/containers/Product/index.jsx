import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd';
import { reqGetProductList, reqSearchProduct, reqUpdateProductStatus } from '../../api/index';
import { connect } from 'react-redux'
import { getCategoryAsync } from '../../redux/actions'
@connect(state => ({ categories: state.categories }), { getCategoryAsync })
class Product extends Component {
  state = {
    ProductList: [], // 初始化product列表
    total: 0, // 初始化总数
    isLoading: false,
    // 收集表单数据
    searchType: 'productName',
    searchValue: '',
    // 当前页数
    current: 1
  }
  // 实例对象的属性
  currentSearchValue = '';
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
      dataIndex: 'price',
      // 如果显示内容包含数据以外的东西 则需要render方法
      render: price => {
        return `￥${price}`
      }
    },
    {
      title: '商品状态',
      // dataIndex: 'status',
      render: ({ _id, status }) => {  // 商品id 商品的状态的状态码
        /*
         status：
           1 已下架
           2 已上架
       */
        if (status === 1) { // 根据商品的status来确定显示的内容
          return (
            <div>
              <Button type='primary' onClick={this.updateProductStatus(_id, status)}>上架</Button>
              <span>已下架</span>
            </div>
          );
        }
        return (
          <div>
            <Button type='primary' onClick={this.updateProductStatus(_id, status)}>下架</Button>
            <span>已上架</span>
          </div>
        );
      }
    },
    {
      title: '操作',
      // dataIndex: 'xxx',
      // 传入一个product 不写dateIndex 则可以得到当前响应的商品对象
      render: (product) => {
        return (
          <div>
            <Button type='link' onClick={this.showProductLook(product)}>详情</Button>
            <Button type='link' onClick={this.showProductUpdata(product)}>修改</Button>
          </div>
        );
      }
    }
  ];

  // 跳转到修改商品信息的页面 通过render传入的product可以获得商品信息
  showProductUpdata = product => {
    // 高阶函数 通过点击当前修改 获取当前商品的信息
    return () => {
      // 商品id 用与跳转的url地址
      const id = product._id;
      // history.push的第二个参数 可以在不同的路由当中传数据 这里传的是商品数据 通过history.push.state获取 默认值是undefin
      this.props.history.push('/product/updata/' + id, product);
    }
  }
  showProductLook = product => {
    return () => {
      const { categories } = this.props;
      // eslint-disable-next-line array-callback-return
      const categoryName = categories.find((category) => {
        if (category._id === product.categoryId) {
          return category.name
        }
      })
      product.categoryName = categoryName;
      // 商品id 用与跳转的url地址
      const id = product._id;
      // history.push的第二个参数 可以在不同的路由当中传数据 这里传的是商品数据 通过history.push.state获取 默认值是undefin
      this.props.history.push('/product/' + id, product);
    }
  }
  /* 
    pramas
    pageNum:页数
    pageSize:每页数量
  */
  getProducrList = (pageNum, pageSize) => {
    const { currentSearchValue } = this; // 搜索关键字
    const { searchType } = this.state; // 搜索恶习
    let promise = null; // 空对象 用来保存请求回来的promise  为两个方法公用的
    this.setState({ // 打开loading
      isLoading: true
    })
    if (currentSearchValue) { // 如果搜索关键字有值 则发送关键字搜索请求
      promise = reqSearchProduct({
        pageNum,
        pageSize,
        searchValue: currentSearchValue,
        searchType
      });
    } else {
      promise = reqGetProductList(pageNum, pageSize) // 如果搜索关键字有值 则发送列表搜索请求
    }

    promise
      .then((response) => {
        this.setState({
          ProductList: response.list,
          total: response.total,
          current:pageNum // 用state保存页码 然后每次渲染都赋值给组件的current 强制跳转到第一页
        });
        message.success(`${currentSearchValue ? '搜索' : '获取'}商品列表成功`);
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        /*
    思考：多次setState调用会合并成最后一次。
      this.setState(obj1)
      this.setState(obj2)
      this.setState(obj3)
      最终做法，将obj1、obj2、obj3合并成一个对象
      const obj = Object.assign(obj1, obj2, obj3);
      this.setState(obj)
  */
        this.setState({ // 关闭loading
          isLoading: false
        })
      })
  }
  // 跳转到添加商品组件
  showAddProduct = () => {
    this.props.history.push('/product/add');

  }
  componentDidMount() { // 组件渲染后 请求商品数据 默认是一页 三个
    this.getProducrList(1, 3);
    this.props.getCategoryAsync();
  }
  search = () => {
    // 获取state 即当前input输入的内容
    const { searchValue } = this.state;
    // 设置实例对象上的属性currentSearchValue为当前输入的关键字 这是搜索的参数
    this.currentSearchValue = searchValue;
    // 发送商品搜索请求
    this.getProducrList(1, 3);
  }
  /*   // 受控组件回调函数1 获取搜索类型的变化
    handleSelect = value =>{
      this.setState({
        searchType: value
      });
    }
    // 受控组件回调函数2 获取搜索关键字的变化
    handleInput = e => {
      this.setState({
        searchValue: e.target.value.trim()
      });
    }; */
  // 收集数据
  handleSelect = value => {
    /*
      正常的DOM(Input)的change事件的参数 是 event  --> e.target.value
      但是，现在是给Select组件绑定change事件，它的参数是value
    */
    // console.log(value);
    this.setState({
      searchType: value
    });
  };

  handleInput = e => {
    this.setState({
      searchValue: e.target.value.trim()
    });
  };

  // 发送请求 修改商品状态
  updateProductStatus = (productId, status) => {
    return () => { // 返回函数 用于不同的调用情景
      const newStatus = 3 - status; // 让status 1变2 2变1
      reqUpdateProductStatus(productId, newStatus) // 发送请求
        .then((res) => {
          message.success('商品状态更新成功');
          this.setState({
            ProductList: this.state.ProductList.map((product) => {
              // 找出商品列表中 id 和选中商品id一样的商品
              if (product._id === productId) {
                return {
                  ...product, // 商品的属性照传
                  status: newStatus // 将新的status传进去 利用对象属性唯一性特点 替换已经存在的status 达到更新state实现页面更新
                }
              }
              return product;
            })
          })
        })
        .catch((err) => { // 失败则提示失败
          message.error(err);
        })
    }

  }
  render() {
    const { total, ProductList, isLoading, searchType,current } = this.state;
    return (
      <div>
        <Card
          title={
            <div>
              <Select defaultValue={searchType} onChange={this.handleSelect}>
                <Select.Option value='productName'>根据商品名称</Select.Option>
                <Select.Option value='productDesc'>根据商品描述</Select.Option>
              </Select>
              <Input
                placeholder='关键字'
                style={{ width: 200, margin: '0 10px' }}
                onChange={this.handleInput}
              />
              <Button type='primary' onClick={this.search}>搜索</Button>
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
                onChange: this.getProducrList,// 变化时的回调函数
                onShowSizeChange: this.getProducrList, // 显示尺寸改变时的回调函数
                current // 默认显示第一页
              }
            }
            rowKey='_id'
            loading={isLoading}
          />
        </Card>
      </div>
    )
  }
}
export default Product;