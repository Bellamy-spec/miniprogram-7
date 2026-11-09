// pages/folder/folder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      {name: '选项A', value: 0},
      {name: '选项B', value: 1},
      {name: '选项C', value: 2},
    ],
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

  radioChange(e){
    const value = e.currentTarget.dataset.value
    console.log('选项值已更改：', value)
  },
})