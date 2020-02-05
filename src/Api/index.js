import axiosInstance from './request';

export const reqLogin = (password,username)=>{
  // 发送登录请求
  // 返回一个promise对象
  return axiosInstance({ // 请求参数
    url:'/login',
    method:'POST',
    data:{
      username,
      password
    }
  })
}

// 发送请求cagegory分类信息请求
export const reqCategory = ()=>{
  return axiosInstance({
    url: '/category/get',
    method: 'GET'
  })
}

// 发送添加分类的请求
export const reqAddCategory = categoryName =>{
  return axiosInstance({
    url: '/category/add',
    method: 'POST',
    data:{
      // 分类名
      categoryName
    }
  })
}

// 发送修改分类的请求
export const reqChangeCategory = (categoryId,categoryName) =>{
  return axiosInstance({
    url: '/category/update',
    method: 'POST',
    data:{
      // 当前分类的ID
      categoryId,
      // 分类名
      categoryName
    }
  })
}

// 发送删除分类的请求
export const reqDeleteCategory = categoryId =>{
  return axiosInstance({
    url: '/category/delete',
    method: 'POST',
    data: {
      categoryId,
    }
  });
}

// 请求商品列表
export const reqGetProductList = (pageNum, pageSize)=>{
  return axiosInstance({
    url:'product/list',
    method:'GET',
    params:{
      pageNum,
      pageSize
    }
  })
}

// 添加商品数据
export const reqAddProduct = ({name, desc, price, detail, categoryId})=>{
  return axiosInstance({
    url:'/product/add',
    method:'POST',
    data:{
        name, 
        desc,
        price, 
        detail, 
        categoryId
      }
  })
}