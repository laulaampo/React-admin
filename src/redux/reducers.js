import {combineReducers} from 'redux';


function aaa (preState=111,action){
  switch(action.type){
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
  aaa,bbb
});