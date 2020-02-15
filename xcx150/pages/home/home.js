import request from '../../service/network.js'

// 定义全局变量用于记录上拉触底事件的次数
// 传sum给后台，确定是第几次请求数据，明确从第几条数据开始查
var sum = 1
const TOP_DISTANCE =  300;
Page({
     
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    showBackTop:false,
    shopListappend:[],
    sliderList:[
          {
            id:1,
            url: '/static/images/q/1.jpg',
            text:'home页面本地text1，home页面本地text1，home页面本地text1'    
          },
          {
            id:2,
            url:'/static/images/q/2.jpg',
            text: 'home页面本地text2'  
          },
          {
            id:3,
            url:'/static/images/q/3.jpg',
            text: 'home页面本地text3'  
          },
          {
            id:4,
            url: '/static/images/q/1.jpg',
            text: 'home页面本地text4'     
          },
          {
            id:5,
            url:'/static/images/q/2.jpg',
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
        _id: 1,
        text: "商品1",
        url: '/static/images/q/1.jpg',
        num: 1,
        pro_name: "屬性值",
        price: "100",
        selected: true,
      },
      {
        _id: 2,
        text: "商品2",
        url: '/static/images/q/2.jpg',
        num: 1,
        pro_name: "屬性值",
        price: "100",
        selected: true,
      },
      {
        _id: 3,
        text: "商品3",
        url: '/static/images/q/3.jpg',
        num: 1,
        pro_name: "屬性值",
        price: "100",
        selected: true,
      },
      {
        _id: 4,
        text: "商品4",
        url: '/static/images/q/4.jpg',
        num: 1,
        pro_name: "屬性值",
        price: "100",
        selected: true,
      },
    ]
  },
//  生命周期函数--监听页面加载
  onLoad: function (options) {
    this.lunbo()
    this.zhongjian()
    this.product()
    // this.updateCar()
  },
//  生命周期函数--监听页面初次渲染完成
    onReady: function () {
  },
//  生命周期函数--监听页面显示
  onShow: function () {
    // this.updateCar()
  },
// 生命周期函数--监听页面隐藏
  onHide: function () {
  },
// 生命周期函数--监听页面卸载
  onUnload: function () {
  },
// 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    console.log('下拉')
  },
  onPageScroll(options){
    const scrollTop = options.scrollTop;
    
    const flag = scrollTop>= TOP_DISTANCE
    
    if(flag != this.data.showBackTop){
        this.setData({
          showBackTop:flag
        })
    }  
  },
//  页面上拉触底事件的处理函数
  onReachBottom: function () {
    // console.log('到底了！')
    // this.product()
    this.zhuijia()
  },
//  用户点击右上角分享
  onShareAppMessage: function () {
  },

  //  轮播图
lunbo(){
      request({
        url:'http://127.0.0.1:1000/sliderList'
      }).then(res=>{
        this.setData({sliderList: res.data
        })
      }).catch(err=>{
        console.log(err)
      })
},
  //中间
zhongjian(){
      request({
        url:'http://127.0.0.1:1000/centerList'
      }).then(res=>{
        this.setData({centerList: res.data
        })
      }).catch(err=>{
        console.log(err)
      })
},

//商品列表
product(){
      request({
        url:'http://127.0.0.1:1000/Article'
      }).then(res=>{
        this.setData({shopList: res.data
        })
      }).catch(err=>{
        console.log(err)
      })
},
//追加数据
zhuijia(){
  var zhuijia = {
    id: 11,
    text: "追加商品",
    url: '/static/images/q/1.jpg',
    num: 1,
    pro_name: "屬性值",
    price: "100",
    selected: true,
  }
  this.data.shopList.push(zhuijia)
  this.setData({
    shopList: this.data.shopList
  })
  // console.log(sum++)
},

  // 刷新购物车tarbar数量
  updateCar(){
     console.log("home is ok")
    var cartItems = wx.getStorageSync('cartItems') || []
    let b = cartItems.length
    if (b > 0) {
      wx.setTabBarBadge({    //为小程序某一项的tabbar右上角添加文本
        index: 0,            //代表哪个tabbar（从0开始）
         text: "" + b + "" 		//显示的内容
       })
     }
  } 
})