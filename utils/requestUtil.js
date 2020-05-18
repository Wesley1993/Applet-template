import {baseUrl} from '../constants/apiConstants'
import {appId} from '../constants/appConstants'

class RequestUtil {
  /**
   * 构造方法
   */
  constructor(){
    this._baseUrl= baseUrl
  }

  //全局登录的唯一标识
  isLogin = false

  //网络请求 请求头
  header = {
    'Content-Type':'application/json',
    'channelType':'wechat',//渠道参数，如不需要可以忽略
  }

  /**
   * Request Method
   * @param {string} url 
   * @param {object} param 
   * @param {obejct} header 
   * @param {string} method 
   */
  Request(url,param,header,method='GET'){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: this._baseUrl+url,
        data:param,
        header:header,
        method:method,
        success:res=>{
          if(res.data.code==200){
            //统一返回成功后的参数处理
            resolve(res);
          }else if(res.data.code===1){

            //特殊返回码处理
            //未登录处理
            //1清除之前登录缓存信息
            this.isLogin=false
            let timer= setTimeout(()=>{
              wx.navigateTo({
                url: '/pages/login/login',
              })
            },500)
            timer=null;
            let tipError = {
              data: {
                code: res.data.code,
                msg: '请登陆后再操作'
              }
            }
            reject(tipError)
          }else{
            reject(res)
          }
        },
        fail:error=>{
          let tipError = {
            data: {
              code:0,
              msg:'请检查您的网络'
            }
          }
          reject(tipError)
        }
      })
    })
  }

  /**
   * GET Request
   * @param {*} url 
   * @param {*} param 
   * @param {*} header 
   */
 GET(url,param,header=this.header){
   return this.Request(url,param,header,'GET')
 }

 /**
  * POST Request
  * @param {*} url 
  * @param {*} param 
  * @param {*} header 
  */
 POST(url,param,header=this.header){
   return this.Request(url,param,header,'POST')
 }

 /**
  * PUT Request
  * @param {*} url 
  * @param {*} param 
  * @param {*} header 
  */
 PUT(url,param,header=this.header){
  return this.Request(url,param,header,'PUT')
 }

 /**
  * DELETE Request
  * @param {*} url 
  * @param {*} param 
  * @param {*} header 
  */
 DELETE(url,param,header=this.header){
   return this.Request(url,param,header,'DELETE')
 }
}

export default RequestUtil