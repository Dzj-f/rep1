// components/d_list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]  
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    shopList:[]
  },
 ready: function () {
    this.updateCar()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    addCars: function (e) {
        let list = e.currentTarget.dataset.shoplist
        // console.log(e) 
        //将购物车数据添加到缓存
        var that = this
        //获取缓存中的已添加购物车信息
        // var aa = wx.getStorageSync('cartItems')
        // console.log(aa[1].text)
        var cartItems = wx.getStorageSync('cartItems') || []

        // 清除缓存 
        //wx.clearStorageSync('cartItems') 
        // console.log(cartItems)
        //判断购物车缓存中是否已存在该货品
        var exist = cartItems.find(function (ele) {
          return ele._id === list._id
        })
         console.log(exist)
        if (exist) {
          //如果存在，则增加该货品的购买数量
          exist.num = parseInt(exist.num) + list.num
        } else {
          //如果不存在，传入该货品信息
          cartItems.push({
            "_id": list._id,
            "text": list.text,
            "url": list.url,
            "num":list.num,
            "pro_name":list.pro_name,
            "price": list.price,
            "selected":list.selected,
          })
        }

        //加入购物车数据，存入缓存
        wx.setStorage({
          key: 'cartItems',
          data: cartItems,
          success: function (res) {
            //添加购物车的消息提示框
            wx.showToast({
              title: "添加购物车",
              icon: "success",
              durantion: 2000
            })
            that.setData({
              shoplist: cartItems,
            })

          }
        })
        console.log(cartItems)
        let b = cartItems.length 
        console.log(b)
        if (b > 0) {
          wx.setTabBarBadge({    
            index: 0,            
            text: "" + b + "" 		
          })
        }
      
      },
      // 刷新购物车tarbar数量，这里的cartItems.length是增加之前的，可以用于初始化
      updateCar(){
        var cartItems = wx.getStorageSync('cartItems') || []
        // console.log(cartItems)
        let b = cartItems.length
        console.log(b)
        if (b > 0) {
          wx.setTabBarBadge({
            index: 0,
            text: "" + b + ""
          })
        }
      }
  }
  
})
