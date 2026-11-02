// app.js
App({
  onLaunch: function () {
    this.globalData = {
      // env 参数说明：
      // env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会请求到哪个云环境的资源
      // 此处请填入环境 ID, 环境 ID 可在微信开发者工具右上顶部工具栏点击云开发按钮打开获取
      env: "",
    };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }

    // 声明logs为获取缓存里的logs记录，没有记录时logs就为空数组；||为逻辑与
    var logs = wx.getStorageSync('logs') || []

    // unshift()是数组的操作方法，它会将一个或多个元素添加到数组的开头，这样最新记录就放在数组的最前面，这里是把Date.now()获取到的时间戳放在数组的最前面
    logs.unshift(Date.now())

    // 将logs数据存储到缓存指定的键（也就是logs）里面
    wx.setStorageSync('logs', logs)
    console.log(logs)
    console.log(Date.now())
  },
});
