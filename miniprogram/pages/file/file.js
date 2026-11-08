// pages/file/file.js
const util = require('../../utils/util.js')
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
    tempFilePath: "",
    logs: [],
    img_url: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      savedFilePath: wx.getStorageSync('savedFilePath'),
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })

    // console.log('未格式化的时间', new Date())
    // console.log('格式化后的时间', util.formatTime(new Date()))

    // console.log('2026年8月2日map处理后的结果', [2026, 8, 2].map(util.formatNumber))
    // console.log('上午9点13分4秒map处理后的结果', [9, 13, 4].map(util.formatNumber))
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

  chooseImage(){
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success(res){
        that.setData({
          tempFilePath: res.tempFiles[0].tempFilePath,
        })
      }
    })
  },

  saveImage(){
    const that = this
    const fs = wx.getFileSystemManager()
    fs.saveFile({
      tempFilePath: this.data.tempFilePath,
      success(res){
        that.setData({
          savedFilePath: res.savedFilePath,
        })
        wx.setStorageSync('savedFilePath', res.savedFilePath)
      }
    })
  },

  choose_img(){
    const that = this
    console.log('最外层', this.data)
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res){
        console.log('进入回调函数当中', this.data)
        console.log('上传文件的临时路径列表', res.tempFiles[0].tempFilePath)
        const filePath = res.tempFiles[0].tempFilePath    // 上传第一张图片
        const ext = filePath.match(/.[^.]+?$/)[0]         // 获取文件后缀名
        const cloudPath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + ext
        console.log('合成的cloudPath', cloudPath)
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('上传成功后获得的res：', res)
            that.setData({
              img_url: res.fileID,
            })
          },
          fail: err => {
            console.log(err)
          },
        })
        console.log('能执行到这里吗？', that.data)
      },
    })
  },

  downFile(){
    wx.cloud.downloadFile({
      fileID: 'cloud://cloud1-7glpq1pj616a8565.636c-cloud1-7glpq1pj616a8565-1312576773/微信图片_20251218214122.jpg'
    }).then(res => {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res){
            wx.showToast({
              icon: 'success',
              title: '保存成功',
            })
          }
        })
    }).catch(err => {
        console.log(err)
    })
  },

  delFile(){
    wx.cloud.deleteFile({
      fileList: [
        'cloud://cloud1-7glpq1pj616a8565.636c-cloud1-7glpq1pj616a8565-1312576773/1793840366399-83.jpg',
        'cloud://cloud1-7glpq1pj616a8565.636c-cloud1-7glpq1pj616a8565-1312576773/1793840590440-298.jpg',
        'cloud://cloud1-7glpq1pj616a8565.636c-cloud1-7glpq1pj616a8565-1312576773/微信图片_20251218214129.jpg',
      ],
    }).then(res => {
      console.log(res.fileList)
      wx.showToast({
        icon: 'success',
        title: '删除成功',
      })
    }).catch(err => {
      console.log(err)
    })
  },

  uploadimg(){
    wx.cloud.callFunction({
      name: 'uploading',
      success: res => {
        console.log(res)
      }
    })
  },
})