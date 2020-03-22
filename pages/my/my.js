import BookModel from '../../modules/book.js'
import ClassicModel from '../../modules/classic.js'
const bookModel = new BookModel()
const classicModel = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },

  userAuthorized() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (info) => {
              this.setData({
                userInfo: info.userInfo,
                authorized: true
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (!userInfo) return
    this.setData({
      userInfo,
      authorized: true
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    })
  },

  getMyFavor() {
    classicModel.getMyFavor().then(res => {
      this.setData({
        classics: res
      })
    })

    var typeText = {
      100: "电影",
      200: "音乐",
      300: "句子"
    }['100']
    console.log(typeText)
  },

  onJumpToDetail() {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})