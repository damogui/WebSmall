Page({
  data: {
    condition: (wx.getStorageSync('appdata')).length ? false : true,
    data: ''
  },
  onLoad:function(){
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];  //当前页面
  //   var prevPage = pages[pages.length - 2];
    // console.log('111',prevPage)
    // wx.switchTab({
    //   url:'/pages/list/list'
    // });
  },
  onShow:function(){
    var that = this;
    // console.log('onshow');
    wx.getStorage({
      key: 'appdata',
      success: function(res) {
        // console.log(res.data)
        that.setData({
          data:res.data,
          condition: (res.data).length ? false : true,
        })
      } 
    })
  },
  delete:function(e){
    var delid = e.currentTarget.dataset.id
    var dataArr = wx.getStorageSync('appdata');
    var that = this;
    // console.log(delid)  
    wx.showModal({
      // title: '提示',
      content: '你确定要删除吗?',
      confirmColor:'#4a90e2',
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < dataArr.length; i++) {
            var thisid = dataArr[i][0].id;
            if (thisid == delid) {
              dataArr.splice(i, 1);
              that.setStorg(dataArr)
            }
          }
        } else if (res.cancel) {
          //console.log('用户点击取消')
        }
      }
    }) 
  },
  setStorg:function(arr){
    // console.log('listset:'+arr.length)
    if(!arr.length){
      this.setData({
        condition: true
      });
    }
    var appAll = [];
    this.setData({
      data: arr
    });
    for (var i = 0; i < arr.length; i++) {
      appAll.push(arr[i]);
    }
    // console.log(appAll)
    wx.setStorage({
      key: 'appdata',
      data: appAll,
      success: function (e) {
        //console.log(e, '更新存储完成')
      }
    })
    

  },
  edit:function(e){
    var editid = e.currentTarget.dataset.eid;
    wx.navigateTo({
      url: '/pages/addnew/addnew?id=' + editid//实际路径要写全
    })
  },
  toqrcode:function(e){
    var qrcode = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/showres/index?id=' + qrcode//实际路径要写全
    })
  }
});
