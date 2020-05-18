import {
  mdUrl
} from '../constants/apiConstant';
import {
  appId,
  mdKey
} from "../constants/appConstant";

class MDUtil {

  /**
   * 构造方法
   */
  constructor() {

  }

  //埋点基础数据模型
  baseData = {
    event: "",
    eventTime: "",
    channel: "MINI_PROGRAM",
    shopName: "",
    shopId: "",
    userId: "",
    version: "",
    deviceId: "",
    data: "",
  }

  //开始埋点
  startDataPoint() {

    let that = this
    setInterval(function() {
      that.uploadDataPoint()
    }, 1000 * 60)

  }

  //上报埋点数据
  uploadDataPoint() {

    this.dataPoint("USER_INLINE_N_MINIUTES", {
      "period": 1
    })

    let formatData = []
    try {
      formatData = wx.getStorageSync(mdKey)
    } catch (error) {
      console.log("埋点上报读取异常", error)
    }

    if (formatData.length > 0) {
      wx.request({
        url: mdUrl,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'channeltype': 'wechat'
        },
        data: {
          dataList: formatData
        },
        success(result) {
          wx.removeStorageSync(mdKey)
        },
        fail(error) {
          console.log("------ 埋点上报接口异常 -------", formatData)
        }
      })
    }
  }


  //数据收集埋点信息

  dataPoint(event, data) {

    let that = this
    let dataList = []

    //取出原始数据
    try {
      let originalData = wx.getStorageSync(mdKey)
      dataList.push(...originalData)
    } catch (error) {
      console.log("埋点读取过程报错", error)
    }

    let baseData = this.baseData
    baseData.event = event
    baseData.data = data
    baseData.eventTime = this.formatFull(new Date())

    dataList.push(JSON.stringify(baseData))

    //存储新增数据
    try {
      wx.setStorageSync(mdKey, dataList)
    } catch (error) {
      console.log("埋点读取过程报错", error)
    }

  }


  formatFull(timeStamp) {
    var time = new Date(timeStamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + this.fixZero(m) + '-' + this.fixZero(d) + ' ' + this.fixZero(h) + ':' + this.fixZero(mm) + ':' + this.fixZero(s);
  }

  fixZero(number) {
    return number < 10 ? '0' + number : number
  }


}

export default MDUtil