//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // this.tt()

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // if (res.code) {
        //   console.log(res.code),
        //   //发起网络请求
        //   wx.request({
        //     url: 'https://test.com/onLogin',  
        //     data: {
        //       code: res.code
        //     },
        //   })
        // } else {
        //   console.log('登录失败！' + res.errMsg)
        // }
      }
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    //请求购物车接口的方法
    wx.request({
      // url: 'http://localhost:1000/Article' + options.cat + '/contactList',
      url: 'http://127.0.0.1:1000/buyList',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        let a = res.data.length
       if(a>0){
        wx.setTabBarBadge({    //为小程序某一项的tabbar右上角添加文本
          index: 1,            //代表哪个tabbar（从0开始）
          text: "" + a + "" 		//显示的内容
        })
       }
      },
      
      fail: function (res) { },
      complete: function (res) { },
    })
 

  },

  onShow: function () {
    // this.tt()
  },

  // tt(){
  //   获取缓存中的已添加购物车信息
  //   var cartItems = wx.getStorageSync('cartItems')
  //   // wx.clearStorageSync('cartItems') 
  //   let b = cartItems.length
  //   if (b > 0) {
  //     wx.setTabBarBadge({    //为小程序某一项的tabbar右上角添加文本
  //       index: 0,            //代表哪个tabbar（从0开始）
  //       text: "" + b + "" 		//显示的内容
  //     })
  //   }
  // },
  globalData: {
    userInfo: null
  }
})