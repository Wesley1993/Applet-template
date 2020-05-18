//index.js
//获取应用实例
const app = getApp()

import {routePath} from '../../constants/routes'

Page({
  data: {
    showLoadFail: false,
    showLoading: false
  },
  onLoad: function () {

    let launchOptions = app.globalData.onLaunchOptions

    if (app.globalData.loginSuccess && app.practical.isEmpty(launchOptions)) {
      app.debugLog('----- 直接进入 -----')
      this.route()
    } else {
      app.debugLog('----- 等待登录回调 -----')
      //等待wx.login回调
      app.loginReadyCallback = res => {
        if (res === 'success') {
          launchOptions = app.globalData.onLaunchOptions
          app.debugLog('----- Route Start -----', launchOptions)
          // this.collectionInfo()
          this.route()
        } else {
          wx.setNavigationBarTitle({
            title: '登录失败'
          })
          this.setData({
            showLoadFail: true,
            showLoading: false
          })
        }
      }
    }
  },
  /**
   * 重新登录
   */
  reLogin(res) {
    wx.setNavigationBarTitle({
      title: '重新登录中'
    })
    this.setData({
      showLoading: true
    })
    app.login()
  },
  
  /**
   * 路由跳转
   */
  route() {

    if (app.globalData.onLaunchOptions) {
      //正常路由
      let path = routePath[app.globalData.onLaunchOptions.query.pathName]
      let param = app.globalData.onLaunchOptions.query
      delete param.pathName
      let pathParam = app.practical.objectToUrlParam(param)

      if (app.practical.isEmpty(path)) {
        path = routePath['home']
      }

      app.debugLog('----- Route Path -----', path)

      pathParam = pathParam.length ? pathParam.replace('&', '?') : ''
      app.debugLog('---- Path Param ----', pathParam)

      wx.reLaunch({
        url: path + pathParam,
      })

      app.globalData.onLaunchOptions = null

    } else {
      //小程序左上角返回首页
      wx.reLaunch({
        url: routePath['home']
      })

    }
  },
})
