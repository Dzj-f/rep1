// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      // url: 'http://localhost:1000/Article/5df7713e71cd9f1a30f15b0d'  ,   //获取详情页，可以通过id
      url: 'http://localhost:1000/' + options.cat +'/Article',    //获取分类页，可以通过name，id等
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res)=> {
      console.log(res)
      let a = res.data
      if(a.length>0){
            this.setData({ 
              shoplist : a
            })
         }
         return
        //  console.log(this.data.shoplist)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.count_price();
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
  }
 

})
