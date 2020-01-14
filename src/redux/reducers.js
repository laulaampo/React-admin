import {combineReducers} from 'redux';
import {SAVE_USER,REMOVE_USER} from './action-type';
import {getItem} from '../utils/storage';

// 默认必须传一个登录状态 每次打开浏览器去getItem获取登录状态 如果没有则传空对象 
const initUser = getItem('user') || {};

// 处理登录状态
function user (preState=initUser,action){
  switch(action.type){
    case SAVE_USER: // 登录 用action的username和password当做state的数据
      return action.data; 
    case REMOVE_USER: // 如果命中登出 则会将存储用户信息的对象变成空对象
        return {};
    default:
      return preState;
  }
}

function bbb (preState=222,action){
  switch(action.type){
    default:
      return preState;
  }
}

export default combineReducers({
  user,
  bbb
});