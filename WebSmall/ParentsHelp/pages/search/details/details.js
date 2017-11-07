var http = require('../../../utils/util');
var app = getApp();
var url = 'https://www.our666.com/Data/GetOrgDetailById';
var queryStr = "";
var phone = "phone";
Page({
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
        orgId: 0
    },
    // btn_click() {

    //     let text = this.data.textarea_text;

    //     queryStr = "";
    //     this.data.jokeList = [];
    //     this.onLoad(1);
    // },
    // bindTextAreaBlur(res) {

    //     this.setData({
    //         textarea_text: res.detail.value,
    //         fanyi_src: '../../img/fanyi.png'
    //     })
    // },
    textarea_bindinput(res) {

        this.setData({
            textarea_text: res.detail.value
        })

    },
    onLoad: function(options) {
        this.data.orgId = options.orgId; //机构id


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

                // that.setData({
                //     jokeList: that.data.jokeList.concat(res.data.Data),
                //     loadingHide: true,
                //     TotalPage: parseInt((res.data.TotalCount / 10)) + 1


                // })
                if (res.data.Data.LinkTel == undefined) {
                    phone = "";
                }

                that.setData({
                    placeData: {
                        OrgName: res.data.Data.OrgName,
                        Address: res.data.Data.Address,
                        LinkTel: res.data.Data.LinkTel,
                        phone: phone,
                        Content: res.data.Data.Content
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