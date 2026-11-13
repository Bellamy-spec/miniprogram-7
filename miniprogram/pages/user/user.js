// pages/user/user.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/images/no_login.png',    // 预填充一张用户未登录的灰色图片
    nickName: '用户未登录',   // 预填充，提醒用户登录
    city: '未知',   // 预填充
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getSetting({
      success: res => {
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: res => {
              let {avatarUrl, city, nickName} = res.userInfo
              this.setData({
                avatarUrl, city, nickName
              })
            }
          })
        }
      }
    })
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

  getUserInfo(event){
    console.log('getUserInfo输出的事件对象', event)
    let {avatarUrl, city, nickName} = event.detail.userInfo
    avatarUrl = avatarUrl.split("/")
    avatarUrl[avatarUrl.length - 1] = 0
    avatarUrl = avatarUrl.join('/')
    this.setData({
      avatarUrl, city, nickName
    })
    this.uploadMsg(avatarUrl, city, nickName)
  },

  login_2026(){
    wx.login({
      success: res => {
        console.log('登录成功返回的信息', res)
      }
    })
  },

  async uploadMsg(avatarUrl, city, nickName){
    const result = await db.collection('clouddisk').where({}).update({
      data: {
        avatarUrl, city, nickName
      },
    })
    console.log('更新结果', result)
  },

  async onAvatar(e){
    let avatarUrl = await this.uploadAvatar(e.detail.avatarUrl)
    console.log('获取到头像在云存储的fileID', avatarUrl)
    this.setData({
      avatarUrl
    })
    const {city, nickName} = this.data
    this.uploadMsg(avatarUrl, city, nickName)
  },

  onNick(e){
    const nickName = e.detail.value
    this.setData({
      nickName
    })
    const {avatarUrl, city} = this.data
    this.uploadMsg(avatarUrl, city, nickName)
  },

  async uploadAvatar(tempPath){
    const ext = tempPath.split('.').pop()
    const cloudPath = `avatars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const res = await wx.cloud.uploadFile({
      cloudPath,
      filePath: tempPath,
    })
    return res.fileID
  },
})