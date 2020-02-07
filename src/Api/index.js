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

// 修改商品数据
export const reqUpdateProduct = ({name, desc, price, detail, categoryId,productId})=>{
  return axiosInstance({
    url:'/product/update',
    method:'POST',
    data:{
        name, 
        desc,
        price, 
        detail, 
        categoryId,
        productId
      }
  })
}

// 搜索商品数据
export const reqSearchProduct = ({ searchType, searchValue, pageNum, pageSize }) => {
  return axiosInstance({
    url: '/product/search',
    method: 'GET',
    params: {
      pageNum, 
      pageSize,
      [searchType]: searchValue
    }
  });
};

// 设置商品上架下架
export const reqUpdateProductStatus = (productId, status) => {
  return axiosInstance({
    url: '/product/update/status',
    method: 'POST',
    data: {
      productId,
      status
    }
  });
};

// 请求获取角色列表数据
export const reqGetRoleList = () => {
  return axiosInstance({
    url: '/role/get',
    method: 'GET',
  });
};

// 请求添加角色数据
export const reqAddRole = (name) => {
  return axiosInstance({
    url: '/role/add',
    method: 'POST',
    data: {
      name
    }
  });
};