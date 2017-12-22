var Ajax=function(option){
    wx.request({
        url: option.url, //接口地址
        data:option.data,//请求参数
        header: {
            'content-type': 'application/json'
        },
        method:option.method||'GET',
        dataType:option.dataType||'json',
        success: function(res) {
            option.success(res)
        },
        fail:function(){
            console.log('出错了。。')
        }
    })
}
module.exports = Ajax