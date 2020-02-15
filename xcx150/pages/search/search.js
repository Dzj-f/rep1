// pages/shoplist/shoplist.js
import request from '../../service/network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counter:0,
    oo:[],
    lists: [
    ],              // 接收搜索的内容
    wxSearchData: '',       // 输入的值
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
//用户点击右上角分享
  onShareAppMessage: function () {
  },
 //监听软键盘确认键
  wxSearchConfirm: function (e) {
  },
 
     handleIncrement(e){
       console.log(e.detail.value)
      request({
        url:'http://127.0.0.1:1000/search',
        method:'post',
        data:{value:e.detail.value}
      }).then(res=>{
        console.log(res)
        this.setData({oo: res.data.ArticleSelect
        })
      }).catch(err=>{
        console.log(err)
      })
}

})
