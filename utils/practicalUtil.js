var barcode = require('./barcode');
var qrcode = require('./qrcode');

class PracticalUtil {

  /**
   * 构造方法
   */
  constructor() {

  }


  /**
   * 获取时间戳
   * @returns {number}
   */
  getTimeStamp() {
    return Date.parse(new Date()) / 1000
  }

  /**
   * 解析Url参数
   * @param url
   */
  queryUrl(url) {
    let reg = /(\w+)=(\w+)/ig;
    let paramer = {};
    url.replace(reg, (a, b, c) => {
      paramer[b] = c;
    });
    return paramer;
  }

  /**
   * 对象转Url参数
   * @param object
   * @returns {string}
   */
  objectToUrlParam(object) {
    let urlParam = ''
    for (let item in object) {
      urlParam += ("&" + item + "=" + object[item])
    }
    return urlParam
  }

  /**
   * 深拷贝
   * @param obj
   * @returns {any}
   */
  deepCopy(obj) {
    if (this.isEmpty(obj)) {
      return ''
    }
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * 克隆对象(递归深拷贝)
   * @param obj
   * @returns {any}
   */
  clone(obj, cache = []) {
    //判断是否为null 或者非object
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    // 如果传入的对象与缓存的相等，则递归结束，避免死循环
    /**
     * 类似下面的情况
     * var a={b:1}
     * a.c=a
     */
    const hit = cache.filter(c => c.original === obj)[0]
    if (hit) {
      return hit.copy
    }
    const copy = Array.isArray(obj) ? [] : {}
    //将copy首先放入cache，因为我们需要在递归deepClone的时候引用到它
    cache.push({
      original: obj,
      copy
    })
    Object.keys(obj).forEach(key => {
      copy[key] = this.clone(obj[key], cache)
    })

    return copy
  }


  calculateDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(
      b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s * 1000
  }


  /**
   * 数组去重
   * @param object
   * @returns {string}
   */
  unique(array) {
    if (!Array.isArray(array)) {
      console.log('type error!')
      return
    }
    var tempArray = [];
    for (var i = 0; i < array.length; i++) {
      if (tempArray.indexOf(array[i]) === -1) {
        tempArray.push(array[i])
      }
    }
    return tempArray;
  }


  /**
   * 判空
   * @param object
   * @returns {boolean}
   */
  isEmpty(object) {
    if (object == '' || object == undefined || object == null) {
      return true
    }
    return false
  }


  //根据屏幕等比例适配宽高
  scaleLength(length) {
    let screenWidth = wx.getSystemInfoSync().windowWidth
    return Math.round(screenWidth * length / 750)
  }


  //生成条形码
  creatBarCode(id, content, width, height, that) {
    barcode.code128(wx.createCanvasContext(id, that), content, this.scaleLength(width), this.scaleLength(height))
  }

  //生成二维码
  createQrCode(id, content, width, height, that) {
    qrcode.api.draw(content, {
      ctx: wx.createCanvasContext(id, that),
      width: this.scaleLength(width),
      height: this.scaleLength(height)
    })
  }


  //校验手机号
  checkMobile(mobile) {
    let TEL_REGEXP = /^1([35689][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    if (TEL_REGEXP.test(mobile)) {
      return true
    }
    return false
  }

  /**
   * 生成UUID
   * @returns {string}
   */
  createUUID() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid;
  }

}

export default PracticalUtil