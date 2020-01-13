  import axios from 'axios';
  import errCode from './errCode';
  // 配置axios拦截器

  /*
    拦截器：
      是一个拦截请求/响应的函数
      作用：
        作为请求拦截器：设置公共的请求头 / 参数...
        作为响应拦截器：
      执行流程；
        1. 执行请求拦截器函数
        2. 发送请求
        3. 执行响应拦截器函数（接受到了响应）
        4. 执行 axiosInstance().then()/catch() 

    axios发送POST请求，
      默认的content-type： application/json 请求体是json
      有可能发送POST请求，需要的Content-type是 application/x-www-form-urlencoded

  */
  const axiosInstance = axios.create({
    baseURL: '/api', // 公共请求路径
    timeout: 20000, // 响应最大时间 超过即为失败
    headers: { // 请求头
      // 公共请求头参数
    }
  })

  // 请求拦截器
  axiosInstance.interceptors.request.use(config => { // 请求成功的回调函数 config为请求载体
    // 如果需要token令牌 则给请求头设置属性 authorization  值为 Bearer token
    let token = ''
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    /*
      如果是POST请求。需要开发者检查请求头是：application/json  applicaion/x-www-form-urlencoded
      如果是 application/json ， 就不用处理（因为axios默认值就是这个）
      如果是 application/x-www-form-urlencoded，就需要对请求参数进行urlencoded转换
    */
    if (config.method === 'post') { // 如果是post请求
      // 将请求数据data{}里面的键值对转化给数组 形式为'key1=value1&key2=value2'  再赋值给请求参数
      const keys = Object.keys(config.data);
      config.data = keys.reduce((pre,crr)=>{
        return pre += `&${crr}=${config.data[crr]}`
      },'').slice(1);
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  })

  // 响应拦截器
  axiosInstance.interceptors.response.use(
    // 响应成功
    (response) => {
      if (response.data.status === 0) {
        // 如果响应成功 请求也成功 则直接返回有用的data信息
        return response.data.data;
      } else {
        // 如果响应成功 请求失败 则返回一个失败的promise对象 对象内穿response的失败信息 真实请求的axios中会直接跳到catch中 并且输出错误原因
        return Promise.reject(response.data.msg);
      }
    },
    // 响应失败
    (err) => {
      /*
      根据不同的错误原因，提示不同错误
    */
      // 初始化错误原因
      let errMsg = ''
      if(err.response){
        errMsg = errCode[err.response.status];
      }else{
        if(err.message.indexOf('Network Error')!==-1){
          errMsg = '网络故障，请重启网络';
        }else if(err.message.indexOf('timeout' !== -1)){
          errMsg = '网络请求超时，请检查网络'
        }
      }
      return Promise.reject(errMsg || '发送未知错误,请联系管理员');
    }
  )

  export default axiosInstance;