var bmap = require('../../libs/bmap-wx.min.js');
Page({

    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target);
        }
        return {
            title: '位置帮手',
            path: "pages/weather/weather",
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    data: {
        weatherData: ''
    },
    onLoad: function() {
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: 'SUEqSOtxTbhlIOXFktXEvWEoIuElDE4Y'
        });
        var fail = function(data) {
            console.log('fail!!!!')
        };
        var success = function(data) {

            console.log('success!!!');
            var weatherData = data.currentWeather[0];
            weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
            that.setData({
                weatherData: weatherData
            });
        }
        BMap.weather({
            fail: fail,
            success: success
        });
    }
})