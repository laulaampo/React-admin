// 保存路由组件属性的文件

import Category from '../components/Category';
import Home from '../components/Home';

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
  }
];

export default routes;