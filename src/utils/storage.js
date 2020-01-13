/**
 * 封装localStorage工具函数库
 */
const localStorage = window.localStorage;

export function getItem(key){
  const value = localStorage.getItem(key); 
  try{
    return JSON.parse(value); // 因为存的时候存的是json格式的数据  所以取出也要通过JSON.parse转化为可以用的格式
  }catch(e){
    return value;
  }
}

export function setItem(key,value){
  // localStore只能存文本数据 如果存一个对象 所以要先将value转为json数据
  value = JSON.stringify(value);
  localStorage.setItem(key,value)
}

export function removeItem(key){
  localStorage.removeItem(key);
}