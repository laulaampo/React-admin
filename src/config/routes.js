// 保存路由组件属性的文件

import Category from '../containers/Category';
import Home from '../components/Home';
import Product from '../containers/Product';
import ProductForm from '../containers/Product/product-form';
import ProductLook from '../containers/Product/product-look';

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
  {
    path:'/product/:id',
    component:ProductLook,
    exact:true
  },
];

export default routes;