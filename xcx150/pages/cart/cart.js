// pages/shoplist/shoplist.js
Page({
// 页面的初始数据
  data: {
   selectAllStatus: true,
    shoplist: null
  },
// 生命周期函数--监听页面加载
  onLoad: function (options) {
      // this.buyList()
        //  this.tt()
  },
// 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    this.count_price();
  },
// 生命周期函数--监听页面显示
  onShow: function () { 
       this.tt()
    this.count_price() 
  },
//  生命周期函数--监听页面隐藏
  onHide: function () {
  },
// 生命周期函数--监听页面卸载
  onUnload: function () {  
  },
//  页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
  },
//  页面上拉触底事件的处理函数
  onReachBottom: function () {
  },
//  用户点击右上角分享
  onShareAppMessage: function () {
  },

// 计算总价
  count_price() {
    // 获取商品列表数据
    let shoplist = this.data.shoplist;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < shoplist.length; i++) {
      // 判断选中计算价格
      if (shoplist[i].selected) {
        // 所有价格加起来 count_money
        total += shoplist[i].num * shoplist[i].price;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      shoplist: shoplist,
      totalPrice: total.toFixed(2)
    })
  },

  // 绑定num增加方法
  btn_add(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let shoplist = this.data.shoplist;
    // 获取商品数量
    let num = shoplist[index].num;
    // 点击递增
    num = num+1;
    // let n = parseInt(num);
    // console.log(typeof(n));
    // n = n+1;
    shoplist[index].num = num;
    // 重新渲染 ---显示新的数量
    this.setData({
      shoplist: shoplist
    });
    // 计算金额方法
    this.count_price();
  },

// 绑定num减少方法
  btn_minus(e) {
     // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let shoplist = this.data.shoplist;
    // 获取商品数量
    let num = shoplist[index].num;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    shoplist[index].num = num;
    // 渲染页面
    this.setData({
      shoplist: shoplist
    });
    // 调用计算金额方法 
    this.count_price();
  },
 
// 从缓存中获取购物车信息
  tt() {
    var that = this
    console.log('tt')
    var cartItems = wx.getStorageSync('cartItems')

    that.setData({
      shoplist: cartItems
    })
  },
  // 是否选中事件
  selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.shoplist
    // 默认全选
    that.data.selectAllStatus = true;
    // 循环数组数据，判断----选中/未选中[selected]
     list[index].selected = !list[index].selected;
    // 如果数组数据全部为selected[true],全选
        for (var i = list.length - 1; i >= 0; i--) {
          if (!list[i].selected) {
            that.data.selectAllStatus = false;
            break;
          }
        }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();     
  },

//购物车全选事件
selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.shoplist;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    // 计算金额方法
    this.count_price();
  },

  // 删除
  deleteList(e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = this.data.shoplist;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        // that.updateCar()
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          // 页面渲染数据
          that.setData({
            list: list
          });
          // 如果数据为空
          if (!list.length) {
            that.setData({
              shoplist: false
            }); 
             
             that.updateCar()            
          } else {
            // 调用金额渲染数据
            that.count_price();
            that.updateCar()
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  // 刷新购物车tarbar数量，这里的cartItems.length是减去之前的，所以要减去1
  updateCar() {
    var cartItems = wx.getStorageSync('cartItems') 
    let b = cartItems.length-1
    console.log(b)
    if (b>0) {
      wx.setTabBarBadge({    
        index: 0,          
        text: "" + b + "" 	
      })
    }else{
      wx.hideTabBarRedDot({
        index: 0
      })
    }
    let that = this;
    let list = this.data.shoplist;
    wx.setStorage({
      key: 'cartItems',
      data: list,
      success: function (res) {
        //添加购物车的消息提示框
        wx.showToast({
          title: "替换成功",
          icon: "success",
          durantion: 2000
        })
        var cart = wx.getStorageSync('cartItems')
        console.log(cart)
      }
    })
   
  },
  //购物车提交
  btn_submit_order(){
    console.log('提交')
  }
})
