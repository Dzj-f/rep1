Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
 //搜索
  wxSearchInput: function (value) {
    console.log(value)
    this.triggerEvent('hhh',{value:value.detail.value},{})
  }

  }
})
