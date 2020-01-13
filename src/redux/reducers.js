import {combineReducers} from 'redux';
import {SAVE_USER} from './action-type';
import {getItem} from '../utils/storage';

// 默认必须传一个登录状态 每次打开浏览器去getItem获取登录状态 如果没有则传空对象 
const initUser = getItem('user') || {};

// 处理登录状态
function user (preState=initUser,action){
  switch(action.type){
    case SAVE_USER:
      return action.data
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