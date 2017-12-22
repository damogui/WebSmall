var HOST_URL = 'http://route.showapi.com/1026-1?showapi_appid=33246&showapi_sign=d9f95823ed4643be91ae3749625b59cd&mobile=';

var config={
    hospital_url:'http://route.showapi.com/87-60?showapi_appid=33852&showapi_sign=b4612443c4614f208b8392dc0513a1b4&page=',
    hospital_detail:'http://route.showapi.com/87-59?showapi_appid=33852&showapi_sign=b4612443c4614f208b8392dc0513a1b4&id='
};

function _getFundListUrl(mobile){
    return HOST_URL + mobile;
}
module.exports={
    getFundListUrl : _getFundListUrl,
    config:config
}