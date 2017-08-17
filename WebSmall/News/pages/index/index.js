//index.js
//获取应用实例


var API_URL1 = "https://hq.sinajs.cn/list=sz300059";
var API_URL2 = "https://hq.sinajs.cn/list=sh600571";
var item1 ;
var item2;
var itemall = [];

 //var lishi = [];//wx.getStorageSync('lishi') ||
 //         var lishiAll = wx.getStorageSync('lishi') || [];
 //         lishi.unshift(res.data.trans_result[0]);
 //         lishiAll.unshift(res.data.trans_result[0]);
 //           wx.setStorage({
 //               key: "lishi",
 //               data: lishi
 //           });

function  GetData() {

    //创建一个dialog
    //wx.showToast({
    //    title: '正在登录...',
    //    icon: 'loading',
    //    duration: 10000
    //});
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
           
            console.log(res.data);
            var hq_str_sz300059 = res.data.split('=')[1];
            item1 ="东:" + hq_str_sz300059.split(',')[3];
            itemall.push(item1);
            wx.setStorage({
                               key: "gdata",
                               data: itemall
                           });
            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);

        },
        fail: function() {
            item1 ="失败1";
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
            console.log(res.data);
            var xyd = res.data.split('=')[1];
            item2 = "信:" + xyd.split(',')[3];
            itemall.push(item2);
            wx.setStorage({
               key: "gdata",
               data: itemall
            });
            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);

        },
        fail: function() {
            item2 = "失败2" ;
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
    onReady () {
      
        // 页面渲染完成
        var that = this
        wx.getStorage({
            key: "gdata",
            success (res) {
                console.log(res.data);
                wx.setData({
                    items:res.data

                });
               
            }
        })
    },
   
  data: {
    img_urls: [
      "https://www.our666.com//GoodUI/img/yg.jpg",
      "https://www.our666.com//GoodUI/img/cn.png",
      "https://www.our666.com//GoodUI/img/erm2.jpg",
      "https://www.our666.com//GoodUI/img/cover2.jpg",
      "https://www.our666.com//GoodUI/img/cover3.png"
    ],
    interval: 5000,
    duration: 2000,

    contents: [0, 1],  //2, 3, 4, 5
     items: itemall,//[
        
     // item1,
     //item2
      //"全能探险家 全新一代路虎发现技术解析",
      //"科技至上 林肯MKZ车机与主动安全体验",
      //"燃料电池VS纯电动 谁会是新能源一哥？",
      //"不朽的传奇 奥迪五缸发动机40年进化史"
    //],
    new_pic: [
      "https://www.our666.com//GoodUI/img/yg.jpg",
      "https://www.our666.com//GoodUI/img/cn.png"
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
