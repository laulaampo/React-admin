// 存储 action 对象的工厂函数集合
import {setItem} from '../utils/storage';
import {reqLogin} from '../api/index';
import {SAVE_USER} from './action-type';

const saveUser = user=>({type:SAVE_USER,data:user});

export const saveUserAsync = (username,password)=>{ //传入参数 用户名 和密码
  return dispatch=>{
    //发送登录请求
    const promise = reqLogin(username,password)
    .then((response)=>{ // 请求成功
      setItem('user',response); // 设置localStorage保存登录状态
      dispatch(saveUser(response)); // 更新redux的stata状态
    })
    return promise; // 返回运算返回值 组件根据返回的promise对象执行行为
  }
}