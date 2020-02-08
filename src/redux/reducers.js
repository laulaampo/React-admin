import {
  combineReducers
} from 'redux';
import {
  SAVE_USER,
  REMOVE_USER,
  CHANGE_LANGUAGE,
  GET_CAGEGORY_LIST,
  ADD_CATEGORY,
  CHANGE_CATEGORY,
  DELETE_CATEGORY,
  GET_ROLE_LIST,
  ADD_ROLE,
  UPDATE_ROLE
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

const initCategory = [] // 默认的category数据是空数组
function categories(preState=initCategory,action){
  switch(action.type){
    case GET_CAGEGORY_LIST:
      return action.data; // 直接返回新数据
    case ADD_CATEGORY: // 添加新的category
        return [...preState,action.data] // 不能改变原状态 只能后续添加
    case CHANGE_CATEGORY:
      return preState.map((category)=>{ // 将元数据中id与修改后id相同的category进行修改
        if(category._id === action.data._id) return action.data;
        return category;
      });
    case DELETE_CATEGORY:
      return preState.filter((item)=>item._id !== action.data ) // 过滤掉指定id的category 即删除
    default:
      return preState;
  }
}

const initRoleList = []// 角色列表默认是空数组
function roles(preState=initRoleList,action){
  switch(action.type){
    case GET_ROLE_LIST:
      return action.data
    case ADD_ROLE:
      return [...preState,action.data]
    case UPDATE_ROLE:
      return preState.map((item)=> {
        if(item._id === action.data._id){ // 找出重新设置权限的role
          return action.data // 重新赋值
        }
        return item; // 不是的不变
      })
    default:
      return preState;
  }
}

export default combineReducers({
  user,
  language,
  categories,
  roles
});