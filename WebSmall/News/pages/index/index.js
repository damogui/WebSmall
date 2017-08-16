//index.js
//获取应用实例


var API_URL1 = "https://hq.sinajs.cn/list=sz300059";
var API_URL2 = "https://hq.sinajs.cn/list=sh600571";
var item1 ;
var item2;
var items = [];

function  GetData() {

    //创建一个dialog
    wx.showToast({
        title: '正在登录...',
        icon: 'loading',
        duration: 10000
    });
    //请求服务器
    wx.request({
        url: API_URL1,
        data: {
           
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
            debugger;
            var hq_str_sz300059 = res.data.split('=')[1];
            item1 = hq_str_sz300059.split(',')[3];
            items.push(item1);

            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);

        },
        fail: function() {
            // fail
            // wx.hideToast();
        },
        complete: function() {
            // complete
        }
    });
    wx.request({
        url: API_URL2,
        data: {
        
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': 'application/json'
        }, // 设置请求的 header
        success: function(res) {
            var hq_str_sz300059 = res.data.split('=')[1];
            item2 = hq_str_sz300059.split(',')[3];
            items.push(item2);
            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);

        },
        fail: function() {
            // fail
            // wx.hideToast();
        },
        complete: function() {
            // complete
        }
    });
}



var app = getApp();



Page({
    onLoad: function () {
        GetData();
    },
   
  data: {
    img_urls: [
      "http://d1.xcar.com.cn/attached/image/20160929/20160929155858_35240.jpg",
      "http://d1.xcar.com.cn/attached/image/20160929/20160929160029_26399.jpg",
      "http://d1.xcar.com.cn/attached/image/20160929/20160929155928_68103.jpg",
      "http://d1.xcar.com.cn/attached/image/20160929/20160929160201_31895.jpg",
      "http://d1.xcar.com.cn/attached/image/20160929/20160929160229_19490.jpg"
    ],
    interval: 5000,
    duration: 2000,

    contents: [0, 1],  //2, 3, 4, 5
    items: [
        
      item1,
     item2
      //"全能探险家 全新一代路虎发现技术解析",
      //"科技至上 林肯MKZ车机与主动安全体验",
      //"燃料电池VS纯电动 谁会是新能源一哥？",
      //"不朽的传奇 奥迪五缸发动机40年进化史"
    ],
    new_pic: [
      "http://pic.xcarimg.com/img/07news/201610/wNdmGPDBGm1475580976311755147558097631.jpg-200x150.jpg",
      "http://pic.xcarimg.com/img/07news/201610/qnDMIK50ud1475464258081744147546425808.jpg-200x150.jpg"
      //"http://pic.xcarimg.com/img/07news/201609/GSJZ0C7c3x1475116821458482147511682145.jpg-200x150.jpg",
      //"http://pic.xcarimg.com/img/07news/201609/CtdlTtd2El1475067775454577147506777545.jpg-200x150.jpg",
      //"http://pic.xcarimg.com/img/07news/201609/mvaZ75mVWE1473064107454160147306410745.jpg-200x150.jpg",
      //"http://pic.xcarimg.com/img/07news/201609/VxAsOdBCh31473237548487414147323754848.jpg-200x150.jpg"
    ],

    load: false
  },

  setLoad: function(e) {
    this.setData({
      load: !this.data.load
    })
  },

  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   console.log('onLoad')
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   app.getUserInfo(function(userInfo){
  //     //更新数据
  //     that.setData({
  //       userInfo:userInfo
  //     })
  //   })
  // }
})
