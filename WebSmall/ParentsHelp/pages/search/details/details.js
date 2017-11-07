var http = require('../../../utils/util');
var app = getApp();
var url = 'https://www.our666.com/Data/GetOrgDetailById';
// var queryStr = "";
var phone = "phone";
var API_URL = "https://www.our666.com/Home/InsertUserNew"; //插入用户信息
var API_URL2 = "https://www.our666.com/Data/PushUserForm"; //进行推送
var orgId = 0;

function Login(code, encryptedData, iv) {

    //console.log('code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv);
    //创建一个dialog
    //wx.showToast({
    //    title: '正在登录...',
    //    icon: 'loading',
    //    duration: 10000
    //});
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
        success: function(res) {
            console.log("成功" + res.data.split('openId:')[1]);

            wx.setStorage({
                key: "openid",
                data: res.data.split('openId:')[1]
            });
            // success
            wx.hideToast();

            return res.data.split('openId:')[1];
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
var that = this;
///插入数据
function PushUserForm(openId, formId) {
    wx.showToast({
        title: '推送成功',
        icon: 'success',
        duration: 2000
    });

    //请求服务器
    wx.request({
        url: API_URL2,
        data: {
            openId: openId,
            formId: formId,
            data: orgId //机构id

        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            'content-type': 'application/json'
        }, // 设置请求的 header
        success: function(res) {


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
    formSubmit: function(e) { //进行插入表单id

        var pushFlag = e.currentTarget.dataset.num;

        if (pushFlag == "1") {
            wx.showToast({
                title: '已经推送一条',
                icon: 'fail',
                duration: 2000
            })

            return;

        }

        var that = this;
        wx.getStorage({
            key: "openid",
            success(res) {

                console.log(res.data);
                if (res.data != null) {

                    that.setData({
                        isPush: 1
                    });

                    PushUserForm(res.data, e.detail.formId);

                }


            }
        })
        console.log('form发生了submit事件，fromId为：', e.detail.formId)
    },
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '机构详情',
            path: "pages/search/details/details",
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    data: {
        placeData: {},
        orgId: 0,
        isPush: 0
    },
    textarea_bindinput(res) {

        this.setData({
            textarea_text: res.detail.value
        })

    },
    onLoad: function(options) {
        this.data.orgId = options.orgId; //机构id
        orgId = options.orgId;
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
                            var openid = Login(code, encryptedData, iv);


                        }
                    });

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg);
                }
            }
        });


        // 页面初始化 options为页面跳转所带来的参数
        var that = this
            //请求列表
        wx.request({
            url: url,
            data: {
                // currentPage: 1,
                // pageSize: 10,
                // type: 3,
                data: this.data.orgId

            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            }, // 设置请求的 header
            success: function(res) {

                if (res.data.Data.LinkTel == undefined) {
                    phone = "";
                }

                that.setData({
                    placeData: {
                        OrgName: res.data.Data.OrgName,
                        Address: res.data.Data.Address,
                        LinkTel: res.data.Data.LinkTel,
                        phone: phone,
                        Content: res.data.Data.Content,
                        ImgUrl: res.data.Data.ImgUrl
                    }
                });


                wx.hideToast();


            },
            fail: function() {

                console.log("失败");

            },
            complete: function() {

            }
        })

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

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {

    }



})