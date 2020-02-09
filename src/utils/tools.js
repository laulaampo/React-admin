// 表单验证工具函数
export const validator = (rule, value, callback) => {
  const reg = /^\w+$/
  // 通过rule.field可以获取当前表单的type
  const name = rule.field === 'username' ? '用户名' : '密码'
  if (!value) {
    // 默认空值也通过 否则会出现两次提示
    callback();
  } else if (value.length < 3) {
    callback(`${name}长度必须大于3位`)
  } else if (value.length > 15) {
    callback(`${name}不能大于15位`)
  } else if (!reg.test(value)) {
    callback(`${name}只能是数字、字母、下划线的组合`)
  }
    /*
    callback() 调用不传参，代表表单校验成功
    callback(message) 调用传参，代表表单校验失败，会提示message错误
  */
  callback()
}