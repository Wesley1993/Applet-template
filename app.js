//app.js
import RequestUtil from './utils/requestUtil'
import FormatUtil from './utils/formatUtil'
import PracticalUtil from './utils/practicalUtil'
import UserUtil from './utils/userUtil'

import appId from './constants/appConstants'
App({


  globalData: {
    //静态变量
    appId: appId,
    shareTitle: '分享标题',
    shareImage: '分享图片路径',

    //生命周期变量
    isOnLunch: true,
    onLaunchOptions: {},
    scene: 1001,

    //用户信息
    token: null,
    openId: null,
    loginSuccess: false,
    userInfo: null,

    //其他信息
    version: '0.0.1', //版本号
    byval: null, //用完请立即置空，页面传参用
    isIPhoneX: false, //iPhoneX标识
    debug: true, //是否开启debugLog
  },
  /**
   * Request Util
   */
  request: new RequestUtil(),

  /**
   * Format util
   */
  format: new FormatUtil(),

  /**
   * Practical Util
   */
  practical: new PracticalUtil(),

  /**
   * User Until
   */
  user: new UserUtil(),

  /**
   * Debug Log
   * @param title
   * @param content
   */
  debugLog(title = '', content = '') {
    if (this.globalData.debug) {
      console.log(title, content)
    }
  },
  onLaunch: function (options) {
    this.debugLog('------ onLaunch 参数 --------', options)
    let systemInfo = wx.getSystemInfoSync();
    let isIPhoneX = (systemInfo.model.indexOf('iPhone X') > -1)
    this.globalData.isIPhoneX = isIPhoneX
    this.setupGlobalData(options)

    if (options.path.indexOf('pages/index/index') > -1) {
      if (this.globalData.onLaunchOptions.query.scene) {
        //扫码进入 （为后续自定义扫码进入做准备）
      } else {
        this.login()
      }
    } else {
      wx.reLaunch({
        url: '/pages/index/index.js',
      })
      this.login()
    }
  },

  /**
   * onShow
   * @param {*} options 
   */
  onShow: function(options){
    this.debugLog('------ onShow 参数 ------', options)

    if (this.globalData.isOnLaunch) {
      this.globalData.isOnLaunch = false
    } else {

      if (options.path.indexOf('pages/index/index') > -1) {

        //正常进入&卡片进入
        this.setupGlobalData(options)

        if (this.globalData.onLaunchOptions.query.scene) {
          //扫码进入（为后续自定义扫码进入做准备)

        } else {
          this.refreshLoginStatus(this.globalData.loginSuccess ? 'success' : 'fail')
        }
      }

    }
  },

  onPageNotFound(options){
   this.debugLog('------ onPageNotFound 参数 ------', options)

    this.setupGlobalData(options)

    wx.reLaunch({
      url: '/pages/index/index'
    })

    this.login()
  },

  //设置全局变量信息
  setupGlobalData(options) {

    this.globalData.onLaunchOptions = options

    if (!this.practical.isEmpty(options.query.shopId)) {
      this.globalData.shopInfo = null
      this.globalData.shopInfo = {
        shopId: options.query.shopId
      }
    }

    if (!this.practical.isEmpty(options.query.channel)) {
      this.globalData.channel = options.query.channel
    }

    if (!this.practical.isEmpty(options.query.inviterId)) {
      this.globalData.inviterId = options.query.inviterId
      this.debugLog('----邀请人id----', this.globalData.inviterId)
    }

    //活动记录id
    if (!this.practical.isEmpty(options.query.participantId)) {
      this.globalData.participantId = options.query.participantId
    }
    //活动id
    if (!this.practical.isEmpty(options.query.activityId)) {
      this.globalData.activityId = options.query.activityId
    }


  },

  /**
   * 登录
   */
  login:function(){
    this.user.getBaseInfo().then(res=>{
      this.debugLog('------ 获取基本信息成功------',res)
      this.refreshLoginStatus('success')
      this.globalData.loginSuccess = true
    }).catch(error=>{
      this.debugLog('----- 获取基本信息失败 -----', error)
      this.refreshLoginStatus('fail')
      this.globalData.loginSuccess = false
    })
  },
    /**
   * 防止登录未完成
   * @param status
   */
  refreshLoginStatus(status) {
    if (this.loginReadyCallback) {
      setTimeout(() => {
        this.loginReadyCallback(status)
      }, 500)
    } else {
      setTimeout(() => {
        this.refreshLoginStatus(status)
      }, 100)
    }
  },
})