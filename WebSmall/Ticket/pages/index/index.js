var NUIM = require('../../components/index');
var base64=require('../../utils/base64');
var Ajax=require('../../utils/ajax');
Page(Object.assign({},NUIM.Toast,{
  data: {
  },
  onLoad:function(){
  },
  toSet:function(){//跳转设置页面
    wx.navigateTo({
        url: '/pages/setinfo/index' //实际路径要写全
    })
  },
  scan: function (e) {
    // this.showToast('功能开发中敬请期待',1500)
    //扫码操作
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if(res.result){
          var len=res.result.length;
          if(res.result.indexOf('$01')>-1){
            var data=res.result.substring(0,len-1).substring(3);
            this.request(base64.decode(data));//扫码成功，请求接口
          }else{
            this.showToast('无法识别的二维码',1500)
          }

        }
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
  request:function(data){//扫码成功请求
    var arr=data.split('</>');
    var baseParam={
      merchantTaxnumMake:"",
      signid:"103db0b0f0b53b89a615957d9d414066",
      validator:"123456"
    };
    var nsrcode=wx.getStorageSync('nsrcode')
    baseParam.merchantTaxnumMake=(nsrcode[0]&&nsrcode[0].code)||'';
    var bizContent={
      "c_kpname":arr[0]||'',
      "c_kpcode":arr[1]||'',
      "c_kpaddr":arr[2]||'',
      "c_kptel":'',
      "c_account_blank":arr[3]||'',
      "c_bank_account":'',
      "adddate":'',
      "remarks":"",
      "invoicetype":"1",
      "source":"16",
      "alipayuserid":'',
    }
    Ajax({
        url:'https://jskptest.jss.com.cn/nuonuo/invoice/testMakeforward.action',
        data:{
          baseParam:baseParam,
          bizContent:bizContent
        },
        success:function(res){
          if(res.data=='sucess'){
            wx.showToast({
              title: '开票成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            this.showToast(res.data,1500)
          }
        }.bind(this)
    })
  }
}));
