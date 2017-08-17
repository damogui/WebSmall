//index.js
//获取应用实例


var API_URL1 = "https://www.our666.com/Home/GetStockData?code=sz300059";
var API_URL2 = "https://www.our666.com/Home/GetStockData?code=sh600571";
var item1;
var item2;
var itemall = [];

function GetData() {
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

           // console.log(res.data);
            var hq_str_sz300059 = res.data.split('=')[1];
            item1 = "东:" + hq_str_sz300059.split(',')[3];
            itemall.push(item1);
            wx.setStorage({
                key: "gdata",
                data: itemall
            });
            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);

        },
        fail: function () {
            wx.showToast({
       title: '请求失败',
       icon: 'loading',
       duration: 10000
    });
            // fail
            // wx.hideToast();
        },
        complete: function () {
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
        success: function (res) {
            //console.log(res.data);
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
        fail: function () {
            item2 = "失败2";
            // fail
            // wx.hideToast();
        },
        complete: function () {
            // complete
        }
    });
};

Page(
    {
    onLoad: function () {
        GetData();
    },data: {
        img_urls: [
            "https://www.our666.com//GoodUI/img/yg.jpg",
            "https://www.our666.com//GoodUI/img/cn.png",
            "https://www.our666.com//GoodUI/img/erm2.jpg",
            "https://www.our666.com//GoodUI/img/cover2.jpg",
            "https://www.our666.com//GoodUI/img/cover3.png"
        ],
        interval: 5000,
        duration: 2000,

        contents: [0, 1], //2, 3, 4, 5
        // items: GetDataShow(),
        new_pic: [
            "https://www.our666.com//GoodUI/img/yg.jpg",
            "https://www.our666.com//GoodUI/img/cn.png"
        ]
    },
    onReady() {

        // 页面渲染完成
        var that = this;
        wx.getStorage({
            key: "gdata",
            success(res) {
                if (res.data != null) {
                that.setData({
                    items: res.data//res.data
                   
                });
            }
                //itemall=res.data;

            }
        })
    }
})
