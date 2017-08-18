//index.js
//获取应用实例


var API_URL1 = "https://www.our666.com/Home/GetStockData?code=sz300059";
var API_URL2 = "https://www.our666.com/Home/GetStockData?code=sh600571";
var item1;
var item2;
var itemall = [];

var API_URL = "https://www.our666.com/Home/InsertUserNew";

function Login(code, encryptedData, iv) {

    //console.log('code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv);
    //创建一个dialog
    wx.showToast({
        title: '正在登录...',
        icon: 'loading',
        duration: 10000
    });
    //请求服务器
    wx.request({
        url: API_URL,
        data: {
            code: code,
            encryptedData: encryptedData,
            iv: iv
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
            console.log("成功" + res+res.data);
            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);

        },
        fail: function () {
            console.log("失败");
            // fail
            // wx.hideToast();
        },
        complete: function () {
            // complete
        }
    })
}



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
            item1 = "dong:" + hq_str_sz300059.split(',')[3];
            itemall.push(item1);
            wx.setStorage({
                key: "gdata",
                data: itemall
            });
            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);
            console.log("sdsds");

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
            item2 = "xin:" + xyd.split(',')[3];
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
        wx.login({//login流程
            success: function (res) {//登录成功
                if (res.code) {
                    var code = res.code;
                    wx.getUserInfo({
                        //getUserInfo流程
                        success: function (res2) { //获取userinfo成功
                            //console.log(res2);
                            var encryptedData = encodeURIComponent(res2.encryptedData); //一定要把加密串转成URI编码
                            var iv = res2.iv;
                            //请求自己的服务器

                            // console.log("?code=" + code + "&encryptedData=" + encryptedData + "&iv=" + iv);
                            Login(code, encryptedData, iv);
                        }
                    });

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg);
                }
            }
        });
       // GetData();
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
        items:[0,1],// GetDataShow(),
        new_pic: [
            "https://www.our666.com//GoodUI/img/yg.jpg",
            "https://www.our666.com//GoodUI/img/cn.png"
        ]
    },item_click(e){
        
             // console.log("修改");
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
        
                    //console.log("data-id:"+e.target.dataset.id);
        
                   // console.log(res.data);
                    var hq_str_sz300059 = res.data.split('=')[1];
                    item1 = "dong:" + hq_str_sz300059.split(',')[3];
                    //console.log(item1);

                    alert(item1)
                    
            //  wx.showtoast({
            //    title: item1,
            //    icon: 'loading',
            //    duration: 10000
            // });
        
                },
                fail: function () {
                    console.log("请求失败");
                    
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
           
            },
    onReady() {


        console.log("渲染完成");
        // 页面渲染完成
        // var that = this;
        // wx.getStorage({
        //     key: "gdata",
        //     success(res) {
        //         if (res.data != null) {
        //         that.setData({
        //             items: res.data//res.data
                   
        //         });
        //     }
        //         //itemall=res.data;

        //     }
        // })
    }
        }
        
        )

     //自己的处理消息

     function  alert(obj){

        wx.showToast({
            title: obj,
            icon: 'loading',
            duration: 1000
     })
    }