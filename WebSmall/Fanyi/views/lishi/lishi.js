Page({
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '中英互译',
            path: 'views/index/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
  data:{
    text:"历史页面",
    fanyi_lishi:[]
  },
  onLoad (options){
  },
  onReady (){
    // 页面渲染完成
  },
  onShow (){
    // 页面显示
    var that = this
    wx.getStorage({
        key: "lishiAll",
  	success (res){

      if(res.data.length>5){
        var newaRR=[];
        for(var i=0;i<5;i++){
          newaRR.push(res.data[i]);
     }

     wx.setStorage({
      key: "lishiAll",
      data: newaRR
  });


      }

    
  	  that.setData({
  	  	fanyi_lishi:res.data
  	  })
  	},
  	fail (){
  	  	console.log('读取数据失败!')
  	}
  	})
  },
  onHide (){
    // 页面隐藏
  },
  onUnload (){
    // 页面关闭
  }
})