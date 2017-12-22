var appInstance = getApp()
var NUIM = require('../../components/index');
Page(Object.assign({},NUIM.Toast,{
  data: {
    id:'',
    name:'',
    code: '',
    addrtel: '',
    bankinfo: ''
  },
  onLoad: function (option) {
    // console.log(option.id)
    wx.showShareMenu({
      withShareTicket: true
    })
    //新添加还是编辑
    if(option.id && option.id!='undefined'){
      var editid= option.id;
      var olddata = wx.getStorageSync('appdata');
      // console.log('edit'+editid);
      for (var i = 0; i < olddata.length; i++) {
        var thisid = olddata[i][0].id;
        if (thisid == editid) {
          this.setData({ 
            id: olddata[i][0].id,
            name: olddata[i][0].name,
            code: olddata[i][0].code,
            addrtel: olddata[i][0].addrtel,
            bankinfo: olddata[i][0].bankinfo 
          })
        }
      }
    }
    //页面表单验证
    this.WxValidate = appInstance.wxValidate(
      {
        name: {
          required: true,
          minlength: 2,
          maxlength: 100,
          totlelength:100
        },
        code: {
          required: true,
          taxNum:true
        },
        addrtel:{
          totlelength: 100
        },
        bankinfo: {
          totlelength: 100
        }
      },
      {
        name: {
          required: '请填写名称'
        },
        code: {
          required: '请填写纳税人识别号'
        }
      }
    )
  },
  formSubmit:function(e){
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      // `${error.param} : ${error.msg} `
      this.showToast(`${error.msg} `,1500)
      return false
    }
    var that = this
    //提交
    var name= e.detail.value.name,
      id= e.detail.value.id,
      code= e.detail.value.code,
      addrtel= e.detail.value.addrtel,
      bankinfo= e.detail.value.bankinfo;
      //console.log(name, id,code, addrtel, bankinfo);
      var timestamp = id?id:new Date().getTime();
      var Datas = [{ 'id': timestamp, 'name': name, 'code': code, 'addrtel': addrtel, 'bankinfo': bankinfo }]
      // console.log( Datas)
      var appAll = [];
      var old = wx.getStorageSync('appdata');
      if(old && old.length){
        for (var i = 0; i < old.length;i++){
          if(!(id==old[i][0].id)){
            appAll.unshift(old[i]);
          }
        }
      }
      appAll.unshift(Datas);

      //保存数据
      wx.setStorage({
        key: 'appdata',
        data: appAll,
        success:function(e){
          //console.log(e);
        }
      })
      // //去二维码页面
      var qrcode = timestamp;
      wx.navigateTo({
        url: '/pages/showres/index?id=' + qrcode //实际路径要写全
      })
    //获取前一个页面设置data
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];  //当前页面
  //   var prevPage = pages[pages.length - 2];
  //   wx.getStorage({
  //     key: 'appdata',
  //     success: function(res) {
  //       //console.log(res.data)
  //       prevPage.setData({
  //         data:res.data
  //       })
  //     } 
  //   })

  }
}));
