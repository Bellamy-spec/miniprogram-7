// pages/file/file.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: "",
    videourl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  chooseImg(){
    const that = this
    wx.chooseMedia({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      mediaType: ['image', 'video'],
      success(res){
        console.log(res.tempFiles)
        const url = res.tempFiles[0].tempFilePath
        console.log(url)
        switch(res.tempFiles[0].fileType){
          case 'image': {
            that.setData({
              imgurl: url,
            })
          }
          case 'video': {
            that.setData({
              videourl: url,
            })
          }
        }
      }
    })
  },
})