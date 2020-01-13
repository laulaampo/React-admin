import axiosInstance from './request';

export const reqLogin = (password,username)=>{
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