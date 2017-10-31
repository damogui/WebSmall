var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
var queryStr = "公园";
Page({
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
    onLoad: function() {

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
    bindTextAreaBlur(res) {
        this.setData({
            textarea_text: res.detail.value,
            fanyi_src: '../../img/fanyi.png'
        })
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
        this.onLoad();
    }
})