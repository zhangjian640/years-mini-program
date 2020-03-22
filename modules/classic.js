import { HTTP } from '../utils/http-p'

class ClassicModel extends HTTP{
  getLatest() {
    return new Promise(resolve => {
      this.request({
        url: 'classic/latest'
      }).then(res => {
        resolve(res)
        this._setLatestIndex(res.index)
        const key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      })
    })
  }

  getClassic(index, nextOrPrevious) {
    return new Promise(resolve => {
      let key = nextOrPrevious === 'next' ? this._getKey(index+1) : this._getKey(index -1)
      let classic = wx.getStorageSync(key)
      if (!classic) {
        this.request({
          url: `classic/${index}/${nextOrPrevious}`
        }).then(res => {
          if (res) {
            wx.setStorageSync(this._getKey(res.index), res)
            resolve(res)
          }
        })
      } else {
        resolve(classic)
      }
    })
  }

  getMyFavor() {
    return this.request({
      url: 'classic/favor'
    })
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  _getLatestIndex() {
    return wx.getStorageSync('latest')
  }
  isFirst(index){
    return index === 1 ? true : false
  }
  isLatest(index) {
      const latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  _getKey(index) {
    return 'classic-' + index
  }
}

export default ClassicModel
