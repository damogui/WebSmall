var http = require('../../utils/util')
var app = getApp()
var url = 'https://www.our666.com//Data/GetOrgsList';

Page({
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '搜索',
            path: "pages/joke/joke",
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    data: {
        page: 1,
        loadingHide: false,
        hideFooter: true,
        jokeList: [],
        TotalPage: 1 //总页数
    },
    onLoad: function(options) {

        // 页面初始化 options为页面跳转所带来的参数
        var that = this
            //请求列表
        wx.request({
            url: url,
            data: {
                currentPage: this.data.page,
                pageSize: 10,
                type: 3
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'content-type': 'application/json'
            }, // 设置请求的 header
            success: function(res) {

                that.setData({
                    jokeList: that.data.jokeList.concat(res.data.Data),
                    loadingHide: true,
                    TotalPage: parseInt((res.data.TotalCount / 10)) + 1


                })


                wx.hideToast();


            },
            fail: function() {

                console.log("失败");

            },
            complete: function() {

            }
        })

    },

    /**
     * 下拉刷新
     */
    onPullDownRefresh() {

    },

    /**
     * 滑动到底部加载更多
     */
    loadMore() {
        //请求笑话列表
        var that = this



        if (this.data.page >= this.data.TotalPage) {

            that.setData({
                    page: this.data.TotalPage
                })
                // hideFooter: true;
            return; //大于当前分页，返回
        } else {
            //显示footer
            this.setData({
                hideFooter: !this.data.hideFooter
            })
            wx.request({
                url: url,
                data: {
                    currentPage: ++this.data.page,
                    pageSize: 10,
                    type: 3
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    'content-type': 'application/json'
                }, // 设置请求的 header
                success: function(res) {

                    that.setData({
                        jokeList: that.data.jokeList.concat(res.data.Data),
                        hideFooter: !that.data.hideFooter
                    })

                    //console.log("成功" + res+res.data);
                    // success
                    wx.hideToast();
                    // console.log('服务器返回' + res.data);

                },
                fail: function() {

                    console.log("失败");

                },
                complete: function() {

                }
            })


        }






    },

})