// pages/classic.js
import ClassicModel from '../../modules/classic'
import LikeModel from '../../modules/like'
const classic = new ClassicModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    classic.getLatest().then(res => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })

    })
  },
  // 自定义事件
  onLike(event) {
    const behavior = event.detail.behavior
    console.log(this.data.classicData)

    likeModel.like(behavior, {
      art_id: this.data.classicData.id,
      type: this.data.classicData.type
    })
  },
  onPrev(event) {
    this._updateClassic('previous')
  },
  onNext(event) {
    this._updateClassic('next')
  },
  _updateClassic(nextOrPrevious) {
    let index = this.data.classicData.index
    classic.getClassic(index, nextOrPrevious).then(res => {
      this._getLikeStatus(res.id, res.type)
      console.log(res)
      this.setData({
        classicData: res,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      })
    })
  },
  _getLikeStatus(artId, category) {
    likeModel.getClassicLikeStatus(artId, category)
    .then(res => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
    })
  },
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
