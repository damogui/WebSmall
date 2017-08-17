
/**
 * 引入MD5生成文件
 * @type {[type]}
 */
var md5 = require('../../utils/md5.js');
/**
 * 引入API接口地址文件
 * @type {[type]}
 */
var api = require('../../utils/api.js');
//调用微信登录接口  

//var request = require("../../utils/request.js");


//wx.login({
//    success: function (res) {
//        console.log(res.code);

//    }
//});

var API_URL = "https://www.our666.com/Home/InsertUser";

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
            // success
            wx.hideToast();
            // console.log('服务器返回' + res.data);

        },
        fail: function () {
            // fail
            // wx.hideToast();
        },
        complete: function () {
            // complete
        }
    })
}



Page({
    onLoad: function () {
        //console.log("iv");
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
       

    },
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
    data: {
        text: "这是一个页面",
        textarea_placeholder: "请输入要翻译的内容",
        btn_text: "翻译",
        btn_text_null: "清空",
        textarea_text: "",
        result_text: "nothing...",
        result: "结果",
        fanyi_lishi: [],
        fanyi_src: "../../images/fanyi.png"
    },
    btn_click_null() {
        this.setData({
            textarea_text: "",
            fanyi_lishi: [],
            result_text: "nothing...",
            fanyi_src: "../../images/fanyi.png"
        })
    },
    textarea_bindinput(res) {
        this.setData({
            textarea_text: res.detail.value
        })
    },
    bindTextAreaFocus() {
        this.setData({
            fanyi_src: "../../images/fanyi_selected.png"
        })
    },
    btn_click() {
        let text = this.data.textarea_text;
        if (text == '' || text == null) {
            wx.showToast({
                title: '请输入要翻译的内容', //提示的内容
                icon: 'success', //图标，只支持"success"、"loading"
                duration: 2000, //提示的延迟时间，单位毫秒，默认：1500, 最大为10000
            })
            return;
        }
        const that = this;
        var salt = (new Date).getTime();
        var appid = api.BAIDU_FANYI_APPID
        var str = appid + text + salt + api.BAIDU_FANYI_APPSCREET;
        var sign = md5.MD5(str)
        wx.request({
            url: api.BAIDU_FANYI_URL,
            data: {
                "q": text,
                "appid": appid,
                "from": "auto",
                "to": "auto",
                "salt": salt,
                "sign": sign
            },
            method: 'get',
            header: {
                'Content-Type': 'jsonp'
            },
            success(res) {

                that.setData({
                    result_text: res.data.trans_result[0].dst,
                    result: that.data.textarea_text,
                    textarea_text: ""
                })
               
                var lishi = [];//wx.getStorageSync('lishi') ||
                var lishiAll = wx.getStorageSync('lishiAll') || [];

               
                lishi.unshift(res.data.trans_result[0]);
                lishiAll.unshift(res.data.trans_result[0]);
                wx.setStorage({
                    key: "lishi",
                    data: lishi
                    
                });

                wx.setStorage({
                    key: "lishiAll",
                    data: lishiAll
                });
                //wx.clearStorageSync();

                wx.getStorage({
                    key: "lishi",
                    success(res) {
                        if (res.data != null) {
                            that.setData({
                                result_text: res.data[0].src,
                                result: res.data[0].dst,
                                fanyi_lishi: res.data
                            });
                        }
                    }
                });


            },
            fail(res) {
                wx.showModal({
                    title: '请求失败',//提示的标题
                    content: '请检查网络设置',//提示的内容
                    showCancel: false, //是否显示取消按钮，默认为 true
                    cancelText: '取消', //取消按钮的文字，默认为"取消"
                    cancelColor: '#000000',//取消按钮的文字颜色，默认为"#000000"
                    confirmText: '确定',//确定按钮的文字，默认为"确定"
                    confirmColor: '#3CC51F',//确定按钮的文字颜色，默认为"#3CC51F"
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else {
                            console.log('用户点击取消或其他')
                        }
                    },
                    fail() {
                        console.log('失败')
                    }
                })
            }
        })
    },
    bindTextAreaBlur(res) {
        this.setData({
            textarea_text: res.detail.value,
            fanyi_src: '../../images/fanyi.png'
        })
    },
    //onLoad (options){
    //  // 页面初始化 options为页面跳转所带来的参数
    //},
    onReady() {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');
    
        // 页面渲染完成
        var that = this
        wx.getStorage({
            key: "lishi",
            success(res) {
                if (res.data != null) {
                    that.setData({
                        result_text: res.data[0].src,
                        result: res.data[0].dst,
                        fanyi_lishi: res.data
                    })
                }
            }
        })
    },
    item_click(e){
        //console.log(e.currentTarget.dataset.tt);
        console.log(e.currentTarget.dataset.g);
        
        // console.log(e.currentTarget.dataset.text)
        // console.log("id:"+e.currentTarget.id);
        
        //  console.log("data-id:"+e.target.dataset.id);
       
      
         this.audioCtx.play();
        //  this.audioCtx.pause();
        // let text = this.data.textarea_text;
        // console.log(text);


    },
    onShow() {
        // 页面显示
    },
    onHide() {

    },
    onUnload() {
        // 页面关闭

    }
})