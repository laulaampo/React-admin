// 保存路由组件属性的文件

import Category from '../containers/Category';
import Home from '../components/Home';
import Product from '../containers/Product';
import ProductForm from '../containers/Product/product-form';
import ProductLook from '../containers/Product/product-look';
import Role from '../containers/Role';
import User from '../containers/User'

const routes = [
  {
    path:'/',
    component:Home,
    exact:true
  },
  {
    path:'/category',
    component:Category,
    exact:true
  },
  {
    path:'/product',
    component:Product,
    exact:true
  },
  {
    path:'/product/add',
    component:ProductForm,
    exact:true
  },
  {
    // /product/update/5ddde47170cb1267ccc6aba8 因为id有n个
    // 匹配多个地址
    path: '/product/updata/:id',
    component: ProductForm,
    exact: true
  },
  { // /product/add 会和这个一同匹配 发生报错 应当在渲染处多套一层<switch> 但是不能换位置 不然无法匹配/product/add
    path:'/product/:id',
    component:ProductLook,
    exact:true
  },
  {
    path:'/role',
    component:Role,
    exact:true
  },
  {
    path: '/user',
    component: User,
    exact: true
  }
];

export default routes;