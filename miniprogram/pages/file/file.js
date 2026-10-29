// pages/file/file.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: [],
    videourl: [],
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
    // console.log(this.data.imgurl)
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
    let that = this
    wx.chooseMedia({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      mediaType: ['image', 'video'],
      success(res){
        // console.log(res.tempFiles)
        var imgList = []
        var videoList = []
        for(var i = 0; i < res.tempFiles.length; i++){
          const url = res.tempFiles[i].tempFilePath
          // console.log(url)
          switch(res.tempFiles[i].fileType){
            case 'image': {
              imgList.push(url)
              wx.getImageInfo({
                src: url,
                success(res){
                  console.log('getImageInfo回调输出的res', res)
                }
              })
              break;
            }
            case 'video': {
              videoList.push(url)
              wx.getVideoInfo({
                src: url,
                success(res){
                  console.log('getVideoInfo回调输出的res', res)
                }
              })
              break;
            }
          }
        }
        that.setData({
          imgurl: imgList,
          videourl: videoList,
        })
        // console.log(that.data)
      }
    })
  },

  previewImg(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: this.data.imgurl,
    })
  },

  previewVideo(e){
    var videoList = []
    for(var i = 0; i < this.data.videourl.length; i++){
      videoList.push({
        url: this.data.videourl[i],
        type: 'video',
      })
    }
    wx.previewMedia({
      sources: videoList,
      current: e.currentTarget.dataset.index,
      success(res){
        console.log('调用成功', res)
      },
      fail(err){
        console.log('调用失败', err)
      }
    })
  },
})