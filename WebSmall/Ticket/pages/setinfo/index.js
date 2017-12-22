var appInstance = getApp()
var NUIM = require('../../components/index');
Page(Object.assign({},NUIM.Toast,{
  data: {
    code:'',
    fenji: '0',
    fws: '航信',
  },
  onLoad: function (option) {
    // console.log(option.id)
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.getStorage({
      key: 'nsrcode',
      success: function(res) {
          var data=res.data[0]
          if(data){
            this.setData({ 
              code:data.code||'',
              fenji: data.fenji||'',
              fws: data.fws||'航信',
            })
          }
      }.bind(this)
    })
    this.WxValidate = appInstance.wxValidate(
      {
        code: {
          required: true,
          taxNum:true
        },
        fenji: {
          required: true,
          minlength: 1,
          maxlength: 10
        }
      },
      {
        code: {
          required: '请填写纳税人识别号'
        },
        fenji: {
          required: '请填写分机号'
        }
      }
    )
},
  selectType:function(){//action事件
      wx.showActionSheet({
        itemList: ['航信', '百望'],
        success: function(res) {
          this.setData({
            "fws":res.tapIndex==0?'航信':'百望'
          })
        }.bind(this),
        fail: function(res) {
          console.log(res.errMsg)
        }
      })
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
    var code= e.detail.value.code,
      fenji= e.detail.value.fenji,
      fws= e.detail.value.fws;
      //console.log(name, id,code, addrtel, bankinfo);
      var Datas = [{ 'code': code, 'fenji': fenji, 'fws': fws}]
      //保存数据
      wx.setStorage({
        key: 'nsrcode',
        data: Datas,
        success:function(e){
          //console.log(e);
        }
      })
      wx.navigateBack({
        delta: 1
      })
  }
}));
