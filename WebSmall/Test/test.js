
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
   
     

    },
    initBtns: function () {
        //todo 绑定事件
      
        //确定重置
        $("body").delegate("#reSetOk", "click", function () {

            //提交表单
            $.ajax({
                type: "post",
                url: "",
                dataType: "json",
                data: {

                    stuId: stuId
                },
                success: function (data) {
                 

                }
            });


        });

    }


};


//绑定数据
$(function () {
    module.init();

});
