// 保存路由组件属性的文件

import Category from '../containers/Category';
import Home from '../components/Home';
import Product from '../containers/Product';

const routes = [
  {
    path:'/',
    component:Home,
    exact:true
  },
  {
    path:'/products/category',
    component:Category,
    exact:true
  },
  {
    path:'/products/product',
    component:Product,
    exact:true
  }
];

export default routes;