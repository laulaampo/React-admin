// 存储 action 对象的工厂函数集合
import {setItem} from '../utils/storage';
import {reqLogin} from '../api/index';
import {SAVE_USER,REMOVE_USER,CHANGE_LANGUAGE} from './action-type';

// 同步登录 用于生产action对象
const saveUser = user=>({type:SAVE_USER,data:user});

// 同步登出功能 无需传对象
export const removeUser = ()=>({type:REMOVE_USER})

// 同步切换语言状态
export const changeLanguage = lan =>({type:CHANGE_LANGUAGE,data:lan})

// 异步登录 用于发送POST请求 请求登录
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