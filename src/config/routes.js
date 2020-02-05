// 保存路由组件属性的文件

import Category from '../containers/Category';
import Home from '../components/Home';
import Product from '../containers/Product';
import AddProduct from '../containers/Product/add-product';

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
    component:AddProduct,
    exact:true
  }
];

export default routes;