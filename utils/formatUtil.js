class FormatUtil {

  /**
   * 构造方法
   */
  constructor() {

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

  /**
   * 格式化时间戳为日期
   * @param timeStamp
   * @param separator
   * @returns {string}
   */
  formatDate(timeStamp, separator = '-') {
    const date = new Date(timeStamp),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate()
    return [year, month, day].map((n) => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }).join(separator)
  }


  /**
   * 格式化时间戳为日期
   * @param timeStamp
   * @param separator
   * @returns {string}
   */
  formatMonthDate(timeStamp, separator = '-') {
    const date = new Date(timeStamp),
      month = date.getMonth() + 1,
      day = date.getDate()
    return [month, day].map((n) => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }).join(separator)
  }

  /**
   * 格式化时间戳为时间
   * @param timeStamp
   * @param separator
   * @returns {string}
   */
  formatTime(timeStamp, separator = ':') {
    const date = new Date(timeStamp),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds()
    return [hour, minute, second].map((n) => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }).join(separator)
  }

  /**
   * 倒计时格式化
   * @param timeCount
   * @param format
   * @returns {string}
   */
  formatCountDown(timeCount, format = 'Day') {

    if (timeCount > 0) {
      let day, hour, minute, second
      if (format == 'Day') {
        day = parseInt(timeCount / (3600 * 24))
        timeCount = timeCount % (3600 * 24)
      }
      hour = parseInt(timeCount / 3600)
      timeCount = timeCount % 3600
      minute = parseInt(timeCount / 60)
      timeCount = timeCount % 60
      second = parseInt(timeCount)

      switch (format) {
        case 'Day':
          return ([day, hour, minute, second]).map((n) => {
            n = n.toString()
            return n[1] ? n : '0' + n
          }).join(':')
          break
        case 'Hour':
          return ([hour, minute, second]).map((n) => {
            n = n.toString()
            return n[1] ? n : '0' + n
          }).join(':')
          break
        default:
          return ''
          break
      }

    } else {
      switch (format) {
        case 'Day':
          return '00:00:00:00'
          break
        case 'Hour':
          return '00:00:00'
          break
        default:
          return ''
          break
      }
    }
  }

}

export default FormatUtil