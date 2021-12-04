/** 存放全局变量 */
export default {
  /** 系统中所有接口都使用这个url请求 */
  url: process.env.VUE_APP_URL + '/api/action',
  rbacUrl: process.env.VUE_APP_URL + '/rbac/api'
};
