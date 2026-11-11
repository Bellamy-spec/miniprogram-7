// pages/folder/folder.js
const app = getApp()
const db = wx.cloud.database()
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
    this.checkUser()
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

  async checkUser(){
    // 判断clouddisk是否有当前用户的数据，注意这里默认带了where({_openid: "当前用户的openid"})的条件
    const userData = (await db.collection('clouddisk').where({
      // _openid: '{openid}'   // 一定要开启安全规则，如果不开启安全规则，{openid}就会失效
      // 如果没有开启安全规则，数据库查询自带Open ID的权限，就不需要写这个条件了
    }).get()).data
    console.log('当前用户的数据对象', userData)

    // 如果当前用户的数据data数组的长度为0，说明数据库里没有当前用户的数据
    if(userData.length === 0){
      // 如果没有当前用户的数据，就新建一个数据框架，其中_id和_openid会自动生成
      // wx.getUserInfo({
      //   success: res => {
      //     const userInfo = res.userInfo
      //     console.log('当前用户信息', userInfo)
      //     await db.collection('clouddisk').add({
      //       data: {
      //         // nickName和avatarUrl可以通过getUserInfo来获取，这里不多介绍
      //         "nickName": userInfo.nickName,
      //         "avatarUrl": userInfo.avatarUrl,
      //         "albums": [],
      //         "folders": []
      //       },
      //     })
      //   }
      // })
      await db.collection('clouddisk').add({
        data: {
          // nickName和avatarUrl可以通过getUserInfo来获取，这里不多介绍
          "nickName": "",
          "avatarUrl": "",
          "albums": [],
          "folders": []
        },
      })
      wx.switchTab({    // 如果数据库不存在用户，除了在数据库创建一条空记录，还要跳转到user页面，
        // 尽管用户已经登录了，还是需要借助button的open-type="getUserInfo"来获取用户的信息
        url: '/pages/user/user',
      })
    }else{    // 如果有数据，就做两件事情：一是使用setData()提供页面渲染数据，二是将数据存储到全局对象中
      this.setData({
        userData
      })
      app.globalData.userData = userData
      console.log('用户数据', userData)
    }
  },
})