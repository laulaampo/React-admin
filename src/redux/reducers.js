import {
  combineReducers
} from 'redux';
import {
  SAVE_USER,
  REMOVE_USER,
  CHANGE_LANGUAGE
} from './action-type';
import {
  getItem
} from '../utils/storage';

// 默认必须传一个登录状态 每次打开浏览器去getItem获取登录状态 如果没有则传空对象 
const initUser = getItem('user') || {};


// 处理登录状态
function user(preState = initUser, action) {
  switch (action.type) {
    case SAVE_USER: // 登录 用action的username和password当做state的数据
      return action.data;
    case REMOVE_USER: // 如果命中登出 则会将存储用户信息的对象变成空对象
      return {};
    default:
      return preState;
  }
}
// 默认语言 即当前浏览器的默认语言
const initLanguage = navigator.language || navigator.languages[0] || 'zh-CN';
// 处理显示的语言的状态
function language(preState = initLanguage, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.data;
    default:
      return preState;
  }
}

export default combineReducers({
  user,
  language
});