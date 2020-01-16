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