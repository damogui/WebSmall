// pages/hospital/hospital.js
var api = require("../../utils/urlStr.js");
const App = getApp()
Page({
  data:{
    inputShowed: false,
    inputVal: "",
    hospitalList:[],
    page:1,
    total:0,
    scrollHeight:0,
    showLoadMore:false,
    showNoMore:false,
    inputValue:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
      wx.getSystemInfo({
      success: function(res) {
        // success
        var hight = (res.windowHeight - 48) * (750 / res.windowWidth);
        that.setData({
          scrollHeight:hight
        });
         console.log("屏幕高度: " + res.windowHeight +" 像素比",res.pixelRatio,"  ",hight)  
      }
    })
    this.$wuxToast = App.wux(this).$wuxToast;
  },
   showInput: function () {
        this.setData({
            inputShowed: true
        });
        console.log("showInput");
    },
    hideInput: function () {
        this.setData({
            inputValue: "",
            inputVal:"",
            showLoadMore:false,
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputValue: "",
            inputVal:"",
            showLoadMore:false,
            hospitalList:[]
        });
         console.log("clearInput");
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value,
            page:1,
        });
        if(e.detail.value.length == 0){
          this.setData({
            hospitalList:[],
            showLoadMore:false,
          });
        }
         console.log("inputTyping");
    },
    getHospitalList:function(e){
        var that = this;
        var url = api.config.hospital_url + that.data.page + '&hosName=' + that.data.inputVal
        console.log("url",url);
        wx.request({
          url: url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
            if(res.data.showapi_res_code== 0){
                if(res.data.showapi_res_body.ret_code == 0){
                  var list = that.data.hospitalList;
                  if(that.data.page == 1){
                    that.setData({
                      hospitalList: res.data.showapi_res_body.hospitalList,
                      total:res.data.showapi_res_body.total,
                      showLoadMore:true,
                    });
                  }else{
                      var templist = res.data.showapi_res_body.hospitalList;
                      for(var i=0;i<templist.length;++i){
                        list.push(templist[i]);
                      }
                      that.setData({
                      hospitalList: list,
                      total:res.data.showapi_res_body.total
                    });
                  }
                }else{
                  that.setData({
                    hospitalList:[]
                   });
                  that.showTips(res.data.showapi_res_body.msg); 
                }
                console.log(that.data.page,"****",that.data.hospitalList);
              }else{
                 var p = this.data.page;
                  p--;
                 that.setData({
                  page:p
                 });
                that.showTips(res.data.showapi_res_error); 
              }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
     showTips:function(content){
    var that = this;
    that.$wuxToast.show({
			type: 'text',
			timer: 1500,
			color: '#fff',
			text: content,
			success: () => console.log(content)
		})
  },
    searchAction:function(e){
        this.getHospitalList();
    },
    loadmore:function(e){
      if(this.data.page * 20 > this.data.total){
        this.setData({
          showLoadMore:false,
          showNoMore:true
        });
      }else{
        var p = this.data.page;
        p++;
        this.setData({
          page:p,
          showLoadMore:true
        })
        this.getHospitalList();
      }
    },
    tapAction:function(e){
      console.log(e);
      wx.navigateTo({
        url: 'result?id='+e.currentTarget.dataset.id,
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    },
  onReady:function(){
    // 页面渲染完成
   
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})