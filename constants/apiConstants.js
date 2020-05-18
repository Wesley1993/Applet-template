/**
 * Base Url
 * @type {string}
 */

 let development = true;//是否是开发模式
 let  baseUrl,webUrl,mdUrl //主接口；webview的接口;埋点主接口
 if(development){
   //开发模式
   baseUrl='';
   webUrl='';
   mdUrl='';
 }else {
   //生产模式
   baseUrl='';
   webUrl='';
   mdUrl='';
 }

 /**
  * 用户基础信息
  */
 const userInfoUrl = '/getWeAppletUserInfo';


 export {
   userInfoUrl
 }