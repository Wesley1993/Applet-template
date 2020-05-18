import RequestUtil from './requestUtil'



class UserUtil {

  /**
   * 构造方法
   */
  constructor() {

  }

  /**
   * 获取基础信息openId&authorizationId
   * @param {*} channel 
   * @param {*} inviterId 
   */
  getBaseInfo(channel, inviterId) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          const request = new RequestUtil();
          //请求自定义登录接口
          // request.POST()
          resolve(res)
        },
        fail:error=>{
          reject(error)
        }
      })
    })
  }
  /**
   * 用户登录
   * @param channel
   * @returns {Promise<any>}
   */
  login(encryptedData, iv, shopId, channel, inviterId) {
    return new Promise((resolve, reject) => {
      let userAuthorizationId = wx.getStorageSync(storageAuthorizationKey)
      const request = new RequestUtil()
      request.POST(userMobileUrl, {
          encryptedData,
          iv,
          shopId,
          channel,
          inviterId,
          userAuthorizationId
        })
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  /**
   * 校验用户权限
   * @param authType
   * @returns {Promise<any>}
   */
  verifyAuth(authType = 'userInfo') {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          if (authType == 'userInfo') {
            if (res.authSetting['scope.userInfo']) {
              resolve(res)
            } else {
              reject(res)
            }
          } else {
            reject(res)
          }
        },
        fail: (error) => {
          reject(error)
        }
      })
    })
  }

  /**
   * 获取用户信息
   * @returns {Promise<any>}
   */
  getUserInfo() {
    return new Promise((resolve, reject) => {
      wx.getUserInfo({
        withCredentials: true,
        lang: 'zh_CN',
        success: res => {
          let userAuthorizationId = wx.getStorageSync(storageAuthorizationKey);
          const request = new RequestUtil()
          request.POST(userDetailInfoUrl, {
              encryptedData: res.encryptedData,
              iv: res.iv,
              userAuthorizationId
            })
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        },
        fail: error => {
          reject(error)
        }
      })
    })
  }
}

export default UserUtil