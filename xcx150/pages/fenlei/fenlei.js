// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    sliderList: [
      {
        id: 1,
        url: '/static/images/q/1.jpg',
        text: 'home页面本地text1，home页面本地text1，home页面本地text1'
      },
      {
        id: 2,
        url: '/static/images/q/2.jpg',
        text: 'home页面本地text2'
      },
      {
        id: 3,
        url: '/static/images/q/3.jpg',
        text: 'home页面本地text3'
      },
      {
        id: 4,
        url: '/static/images/q/1.jpg',
        text: 'home页面本地text4'
      },
      {
        id: 5,
        url: '/static/images/q/2.jpg',
        text: 'home页面本地text5'
      }
    ],

    centerList: [
      {
        id: 1,
        url: '/static/images/q/1.jpg',
        text: 'home页面本地text1'
      },
      {
        id: 2,
        url: '/static/images/q/2.jpg',
        text: 'home页面本地text1'
      },
      {
        id: 3,
        url: '/static/images/q/3.jpg',
        text: 'home页面本地text1'
      },
      {
        id: 4,
        url: '/static/images/q/4.jpg',
        text: 'home页面本地text1'
      },
    ],
    shopList: [
      {
        id: 1,
        text: "商品1",
        url: '/static/images/q/1.jpg',
        num: 1,
        pro_name: "屬性值",
        price: "100",
        selected: true,
      },
      {
        text: "商品2",
        url: '/static/images/q/2.jpg',
        num: 1,
        pro_name: "屬性值",
        price: "100",
        selected: true,
      },
      {
        id: 3,
        text: "商品3",
        url: '/static/images/q/3.jpg',
        num: 1,
        pro_name: "屬性值",
        price: "100",
        selected: true,
      },
      {
        id: 4,
        text: "商品4",
        url: '/static/images/q/4.jpg',
        num: 1,
        pro_name: "屬性值",
        price: "100",
        selected: true,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  轮播图

    wx.request({
      url: 'http://localhost:1000/sliderList',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // console.log(this.data),
        //   console.log(res.data),
        //   console.log(res.data.data),
        //   console.log(this.data.sliderList),
        //  this.data.sliderList = res.data,
        this.setData({
          //已经获取成功接口数据
          sliderList: res.data

        })
        // console.log(this.data.sliderList)

      },
      fail: function (res) { },
      complete: function (res) { },
    })
    //中间
    wx.request({
      url: 'http://localhost:1000/centerList',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        //  this.data.sliderList = res.data,
        this.setData({
          //已经获取成功接口数据
          centerList: res.data

        })
        // console.log(this.data.centerList)

      },
      fail: function (res) { },
      complete: function (res) { },
    })



    //商品列表
    wx.request({
      url: 'http://localhost:1000/Article',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          //已经获取成功接口数据
          shopList: res.data

        })
        //  console.log(this.data.shopList)

      },
      fail: function (res) { },
      complete: function (res) { },
    })

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

  toCart() {
    wx.request({
      url: 'http://localhost:1000/buyList',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          sliderList: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


})