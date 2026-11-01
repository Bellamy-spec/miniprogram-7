// pages/file/file.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: [],
    videourl: [],
    tempFiles: [],
    location: {},
    markers: [],
    downloadFile: "",
    savedFilePath: "",
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

  saveImg(e){
    wx.saveImageToPhotosAlbum({
      filePath: e.currentTarget.dataset.src,
      success(res){
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },

  chooseFile(){
    let that = this
    wx.chooseMessageFile({
      count: 5,
      type: 'file',
      success(res){
        // console.log('上传文件的回调函数返回值', res)
        let tempFiles = res.tempFiles
        that.setData({
          tempFiles
        })
      }
    })
  },

  chooseLocation(){
    let that = this
    wx.chooseLocation({
      success(res){
        const location = res
        const markers = [{
          id: 1,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: '/images/loc.png',
          width: 30,
          height: 30,
        }]
        that.setData({
          location,
          markers,
        })
      },
      fail(res){
        console.log('获取位置失败', res)
      }
    })
  },

  downloadFile(){
    let that = this
    const downloadTask = wx.downloadFile({
    // wx.downloadFile({
      url: 'https://636c-cloud1-7glpq1pj616a8565-1312576773.tcb.qcloud.la/0cc6119423c1316563e5d68f6fff170.jpg',
      success(res){
        console.log('成功回调之后的res对象', res)
        // 只要服务器有响应数据，就会把响应内容写入文件并进入success()回调
        // 业务需要自行判断是否下载到了想要的内容
        if(res.statusCode === 200){ // 如果网络请求成功
          that.setData({
            downloadFile: res.tempFilePath,
          })
        }
      },
      fail(res){
        console.log('下载文件失败', res)
      },
    })

    downloadTask.onProgressUpdate((res) => {
      // console.log('下载进度', res.progress)
      // console.log('已经下载的数据长度', res.totalBytesWritten)
      // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      wx.showToast({
        title: '正在下载：'.concat(res.progress).concat('%'),
        icon: 'loading',
        duration: 500,
      })
    })
  },

  openDoc(){
    const downloadTask = wx.downloadFile({
      url: 'https://636c-cloud1-7glpq1pj616a8565-1312576773.tcb.qcloud.la/tools_power_class.pdf',
      success(res){
        console.log('成功回调之后的res对象', res)
        if(res.statusCode === 200){
          wx.openDocument({
            filePath: res.tempFilePath,
            success: function(res){
              console.log('打开文档成功')
            },
            fail: function(err){
              console.log(err)
            },
          })
        }
      },
    })

    downloadTask.onProgressUpdate((res) => {
      wx.showToast({
        title: '正在下载：'.concat(res.progress).concat('%'),
        icon: 'loading',
        duration: 500,
      })
    })
  },

  downloadPDF(){
    const that = this
    const downloadTask = wx.downloadFile({
      url: 'https://636c-cloud1-7glpq1pj616a8565-1312576773.tcb.qcloud.la/tools_power_class.pdf',
      success(res){
        console.log('成功回调之后的res对象', res)
        if(res.statusCode === 200){
          const fs = wx.getFileSystemManager()
          fs.saveFile({
            tempFilePath: res.tempFilePath,
            success(res){
              console.log('保存文件成功的回调', res)
              that.setData({
                savedFilePath: res.savedFilePath,
              })
            }
          })
        }
      }
    })

    downloadTask.onProgressUpdate((res) => {
      wx.showToast({
        title: '正在下载：'.concat(res.progress).concat('%'),
        icon: 'loading',
        duration: 500,
      })
    })
  },

  openPDF(){
    const that = this
    wx.openDocument({
      filePath: that.data.savedFilePath,
      success: function(res){
        console.log('打开文档成功')
      },
      fail: function(err){
        console.log('打开文档失败', err)
      },
    })
  },
})