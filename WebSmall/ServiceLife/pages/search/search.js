var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
var queryStr = "公园";
var API_URL = "https://www.our666.com/Home/InsertUser";
//回去用户信息
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
            iv: iv,
            type: 3
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': 'application/json'
        }, // 设置请求的 header
        success: function(res) {

            //console.log("成功" + res+res.data);
            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);

        },
        fail: function() {

            console.log("失败");
            // fail
            // wx.hideToast();
        },
        complete: function() {
            // complete
        }
    })
}

Page({
    controltap: function(e) {
        console.log(e.controlId);
    },
    calling: function(e) {

        var phone = e.currentTarget.dataset.num;
        phone = phone.replace('电话：', '').split(',')[0];
        if (phone == "undefined") {
            return;

        }
        wx.makePhoneCall({
            phoneNumber: phone, //此号码并非真实电话号码，仅用于测试
            success: function() {
                console.log("拨打电话成功！")
            },
            fail: function() {
                console.log("拨打电话失败！")
            }
        })

    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '位置帮手',
            path: 'pages/search/search',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        placeData: {},

        textarea_placeholder: "请输入要搜索的内容",
        btn_text: "搜索",

        textarea_text: "",
        result_text: "nothing...",
        result: "结果",
        fanyi_lishi: [],
        fanyi_src: "../../img/fanyi.png"
    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);
    },
    onLoad: function(obj) {
        wx.login({ //login流程
            success: function(res) { //登录成功
                if (res.code) {
                    var code = res.code;
                    wx.getUserInfo({
                        //getUserInfo流程
                        success: function(res2) { //获取userinfo成功
                            //console.log(res2);
                            var encryptedData = encodeURIComponent(res2.encryptedData); //一定要把加密串转成URI编码
                            var iv = res2.iv;
                            //请求自己的服务器

                            // console.log("?code=" + code + "&encryptedData=" + encryptedData + "&iv=" + iv);

                            if (obj != 1) {

                                Login(code, encryptedData, iv);

                            }


                        }
                    });

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg);
                }
            }
        });
        // if (txt.toString.length == 0 || txt == null) {
        //     txt = "公园";
        // }
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: 'SUEqSOtxTbhlIOXFktXEvWEoIuElDE4Y'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {

            wxMarkerData = data.wxMarkerData;
            if (wxMarkerData.length == 0) {
                return;


            }
            that.setData({
                markers: wxMarkerData
            });
            that.setData({

                latitude: wxMarkerData[0].latitude
            });
            that.setData({
                longitude: wxMarkerData[0].longitude
            });
        }
        BMap.search({
            "query": queryStr,
            fail: fail,
            success: success,
            iconPath: '../../img/marker_red.png',
            iconTapPath: '../../img/marker_red.png'
        });
    },
    showSearchInfo: function(data, i) {
        var that = this;
        that.setData({
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone
            }
        });
    },
    changeMarkerColor: function(data, id) {
        var that = this;
        var markersTemp = [];
        for (var i = 0; i < data.length; i++) {
            if (i === id) {
                data[i].iconPath = "../../img/marker_yellow.png";
            } else {
                data[i].iconPath = "../../img/marker_red.png";
            }
            markersTemp[i] = data[i];
        }
        that.setData({
            markers: markersTemp
        });
    },

    btn_click() {

        let text = this.data.textarea_text;
        if (text == '' || text == null) {
            wx.showToast({
                title: '请输入要搜索的内容', //提示的内容
                icon: 'success', //图标，只支持"success"、"loading"
                duration: 2000, //提示的延迟时间，单位毫秒，默认：1500, 最大为10000
            })
            return;
        }
        // const that = this;
        // var salt = (new Date).getTime();
        // var appid = api.BAIDU_FANYI_APPID
        // var str = appid + text + salt + api.BAIDU_FANYI_APPSCREET;
        // var sign = md5.MD5(str);

        queryStr = text;
        this.onLoad(1);
    },
    bindTextAreaBlur(res) {

        this.setData({
            textarea_text: res.detail.value,
            fanyi_src: '../../img/fanyi.png'
        })
    },
    textarea_bindinput(res) {

        this.setData({
            textarea_text: res.detail.value
        })

    }
})