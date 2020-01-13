import axiosInstance from './request';

export const reqLogin = (password,username)=>{
  return axiosInstance({
    url:'/login',
    method:'POST',
    data:{
      username,
      password
    }
  })
}