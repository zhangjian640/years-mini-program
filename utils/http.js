import { config } from '../config'
const tips = {
  1: '抱歉，出现了一个错误',
  3000: '期刊不存在'
}
class HTTP {
  request(params) {
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method || 'GET',
      data: params.data,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success(res.data)
        } else {
          this._show_error(res.data.message)
        }
      },
      fail(err) {
        this._show_error(err.data.message)
      }
    })
  }
  static _show_error(message){
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  }
}

export default HTTP
