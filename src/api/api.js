import axios from 'axios'
import qs from 'qs'
import util from '@/common/js/util'

if (window.location.href.indexOf('localhost') === -1) {
  axios.defaults.baseURL = 'http://140.143.164.116:9999/'
}

// 统一对登录情况做处理
// axios.interceptors.response.use(function (response) {
//   const res = response.data
//   if (res.error_no === 1102) {
//     let redirectUrl
//     if (res.result.platform === 1) {
//       redirectUrl = 'https://uuap.inwaimai.baidu.com/ucenter/userlogin?redirect_url=http%3A%2F%2Fpeak.inwaimai.baidu.com%3A8159%2F%23%2F'
//     } else {
//       // 判断未登录的情况下，跳转到登录页，并把redirect_url参数做替换
//       redirectUrl = res.result.login_url.replace(util.getQueryByNameFromUrl('redirect_url', res.result.login_url), encodeURIComponent(window.location.href))
//     }
//     window.location.href = redirectUrl
//   } else {
//     return response
//   }
// }, function (error) {
//   // 当响应异常时做一些处理
//   return Promise.reject(error)
// })

// 登出接口
export const logOut = params => { return axios({method: 'post', url: '/authui/logout', data: qs.stringify(params)}) }
// getuser msg
export const getUserMsg = params => { return axios({method: 'get', url: '/api/user/usermsg', data: params}) }
// getDetail
export const getDetail = params => { return axios.get(`/api/detail/list`, { params: params }) }
// get Detail add id
export const getDetailData = params => { return axios({method: 'post', url: '/api/detail/detailData', data: qs.stringify(params)}) }
// create new module
export const createModule = params => { return axios({method: 'post', url: '/api/detail/createmodule', data: qs.stringify(params)}) }

// 点赞
export const addfavourite = params => { return axios({method: 'post', url: '/api/detail/addfavourite', data: qs.stringify(params)}) }
