//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        motto: '微信小程序尝鲜，地图定位',
        userInfo: {},
        appInfo: {
            logoUrl: '../../image/logo.png',
            title: '使用微信内置地图查看API定位'
        }
    },
    //事件处理函数
    bindViewTap: function() {
        debugger;
        wx.navigateTo({
            // url: "../location/location"
            url: "../location/location", //url跳转地址
            success: function(res) {
                console.log(res)
            },
            fail: function(res) {
                console.log(res)
            }

        })
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this
        that.setData({
                appInfo: this.data.appInfo
            })
            //调用应用实例的方法获取全局数据
            // app.getUserInfo(function(userInfo){
            //   //更新数据
            //   that.setData({
            //     userInfo:userInfo
            //   })
            //   that.update()
            // })
    }
})