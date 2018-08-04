// pages/device/device.js

var temp_devices = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '扫描设备',
    userInfo: {},
    isopen: false,
    disabled: false,
    connected: false,
    devices : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.switchDevice(true);
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

  },
  //
  switchDevice: function (enabled) {
    var that = this
    // 打开蓝牙适配器
    if (enabled) {
      wx.openBluetoothAdapter({
        success: function (res) {
          console.log('蓝牙适配器已打开', res)
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('蓝牙适配器状态变化', res)
            that.setData({
              actioninfo: res.available ? '蓝牙适配器可用' : '蓝牙适配器不可用',
              searchingstatus: res.discovering ? '正在搜索' : '搜索可用'
            })
          })
          wx.onBluetoothDeviceFound(function (res) {
            for (var i in res.devices) {
              var exists = false
              var device = res.devices[i]
              for (var j in temp_devices) {
                var _device = temp_devices[j]
                if (_device.deviceId == device.deviceId && _device.name == device.name) {
                  exists = true
                  break
                }
              }
              if (!exists) {
                temp_devices.push(device)
                that.setData({
                  devices: temp_devices
                })
                console.log('新设备已找到：', device.name, ' (', device.deviceId, ')')
              }
            }
          })
        },
        fail: function (res) {
          console.log(res)
          that.setData({
            errmsg: '请检查手机蓝牙是否打开'
          })
        }
      })
    } else {
      wx.closeBluetoothAdapter({
        complete: () => {
          wx.hideToast()
        },
        success: function (res) {
          console.log(res)
          that.setData({
            errmsg: "功能已关闭"
          })
        },
        fail: function (res) {
          console.log(res)
          that.setData({
            errmsg: "请检查手机蓝牙是否打开"
          })
        }
      })
    }
  },
  onPullDownRefresh: () => {
    var that = this
    wx.showLoading({
      title: '扫描设备中',
    })
    setTimeout(function () {
      wx.hideLoading()
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log('stop bluetooth devices discovery.')
        },
      })
    }, 10000)
    wx.startBluetoothDevicesDiscovery({
      success: (res) => {
        console.log("开始搜索附近蓝牙设备:", res)
      },
      fail: () => {
        wx.hideLoading()
      },
    })
  }
})
