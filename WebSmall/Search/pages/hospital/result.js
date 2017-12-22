// pages/hospital/result.js
var api = require("../../utils/urlStr.js");
Page({
  data:{
    title:'',
    job:'',
    info:'',
    address:'',
    id:''
  },
  getDetail:function(e){
    var that = this;
    var url = api.config.hospital_detail + this.data.id
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        if(res.data.showapi_res_code == 0){
          var response = res.data.showapi_res_body;
           that.setData({
            title:response.hosName,
            job:'主治：'+response.zzjb,
            info:'  '+response.info,
            address:'地址：'+response.addr
          });
        }
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id:options.id
    });
    this.getDetail();
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})