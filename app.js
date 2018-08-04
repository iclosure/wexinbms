//app.js
App({
  onLaunch: function () {
    // main menu
    // switch tab to page 'realtime'
    wx.switchTab({
      url: 'pages/realtime/realtime',
    })
  },

  searchbluetooth: function () {
    var that = this
    wx.startBluetoothDevicesDiscovery({
      success: function (res) {
        console.log("开始搜索附近蓝牙设备")
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})