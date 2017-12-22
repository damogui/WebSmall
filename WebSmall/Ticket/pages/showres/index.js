var qrcode = require("../../utils/wxqrcode.js");
// var CRC = require("../../utils/crc16.js");
var Base64 = require("../../utils/base64.js");
Page({
  data: {
    id:'',
    name:'',
    code: '',
    addrtel: '',
    bankinfo: '',
    qrcodeimg:''
  },
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 500;//不同屏幕下canvas的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      var height = width;//canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      //console.log("获取设备信息失败" + e);
    }
    return size;
  },
  onUnload:function(){
    
    // var pages = getCurrentPages();  
    // var prevPage = pages[pages.length - 2];//上一个页面。  
    // var router = (prevPage.route).split('/')
    // console.log(router[1])
    // if(router[1] =='addnew'){
    //   wx.navigateBack({
    //     delta:2
    //   })
    // }
  },
  onLoad: function (option) {
    
    //判断是否有id
    if(option.id && option.id!='undefined'){
      var editid= option.id;
      var olddata = wx.getStorageSync('appdata');
      for (var i = 0; i < olddata.length; i++) {
        var thisid = olddata[i][0].id;
        if (thisid == editid) {
          //回写 data
          this.setData({ 
            id: olddata[i][0].id,
            name: olddata[i][0].name,
            code: olddata[i][0].code,
            addrtel: olddata[i][0].addrtel,
            bankinfo: olddata[i][0].bankinfo 
          })
        }
      }
    }
    //设置标题
    wx.setNavigationBarTitle({
      title: this.data.name
    })
    //字段转base64
    var info = this.data;
    const basestr = info.name+'</>'+ info.code +'</>'+ info.addrtel +'</>'+ info.bankinfo +'</>FFFF' ;
    var base64code = Base64.encode(basestr);
    // 增加校验码
    var finishCode = '$01'+base64code+'$'  
    // console.log(qrcodedata)
    
    //crc16
    // var crc16 = CRC.ToCRC16('12345678');
    // var crc16M = CRC.ToModbusCRC16('12345678');
    // console.log(crc16,crc16M)

    //生成二维码
    var qrcodedata = qrcode.createQrCodeImg(finishCode,{'size':350});
    this.setData({
      qrcodeimg:qrcodedata
    })
  },
  previewImg:function(e){
    var crtimg = this.data.qrcodeimg;
    wx.previewImage({
      current: crtimg, // 当前显示图片的http链接 http://ifuyuan-wang-static.smartgslb.com/images/img-profile/about_2.png
      urls: [crtimg], // 需要预览的图片http链接列表
      success:function(res){
        // console.log(res)
      }
    })
  }
});
