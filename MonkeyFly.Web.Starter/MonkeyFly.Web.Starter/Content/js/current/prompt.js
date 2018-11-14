//@author Alvin 2016年8月7日
//提示窗
mf.message = function () {
    var self = this;
    //成功提示窗
    this.success = function (title, tip, callback, animation) {
        if (!animation) animation = false;
        swal({
            title: title,
            text: tip,
            type: "success",
            showConfirmButton: true,
            confirmButtonText: promptBtn.Comfirm,
            animation: animation,
            allowOutsideClick: false,
            showLoaderOnConfirm: false,
            closeOnConfirm: true,
            closeOnCancel: false,
        }, function (isConfirm) {
            if (isConfirm) {
                callback && callback();
            }
        });
    };
    //错误提示窗，callback返回函数
    this.error = function (title, tip, callback) {      
        swal({
            title: title,
            text: tip,
            type: "error",
            showConfirmButton: true,
            closeOnConfirm: true,
            closeOnCancel: false,
            confirmButtonText: promptBtn.Comfirm,
        }, function (isConfirm) {
            if (isConfirm) {
                callback && callback();
            }
        });
    };
    //警告提示窗，callback返回函数
    this.warning = function (title, tip, callback, cancelcall) {
        swal({
            title: title,
            text: tip,
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: true,
            confirmButtonText: promptBtn.Comfirm,
            cancelButtonText: promptBtn.Cancle
        },
        function (isConfirm) {
            if (isConfirm) {
                callback && callback();
            }
            else {
                cancelcall && cancelcall();
            }
        });
    };
    //消息提示窗
    this.info = function (title, tip) {
        swal({
            title: title,
            text: tip,
            type: "info",
            showConfirmButton: true,
            allowOutsideClick: false,
            showLoaderOnConfirm: false,
            closeOnCancel: false,
            confirmButtonText: promptBtn.Comfirm
        });
    };

    //错误提示窗，callback返回函数
    this.infoCall = function (title, tip, callback) {
        swal({
            title: title,
            text: tip,
            type: "info",
            showConfirmButton: true,
            closeOnConfirm: true,
            closeOnCancel: false,
            showLoaderOnConfirm: false,
            confirmButtonText: promptBtn.Comfirm,
        }, function (isConfirm) {
            if (isConfirm) {
                callback && callback();
            }
        });
    };

    //Amanda
    //特殊处理的警告提示窗，callback返回函数
    this.warningOne = function (title, tip, callback, cancelcall) {
        swal({
            title: title,
            text: tip,
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            closeOnConfirm: true,
            closeOnCancel: true,
            confirmButtonText: promptBtn.Comfirm,
            cancelButtonText: promptBtn.Cancle
        },
        function (isConfirm) {
            if (isConfirm) {
                callback && callback();
            }
            else {
                cancelcall && cancelcall();
            }
        });
    };

    //警告提示窗，和上面warning的唯一区别是按确认时提示框会消失
    this.warnings = function (title, tip, callback, cancelcall) {
        swal({
            title: title,
            text: tip,
            type: "warning",
            showConfirmButton: true,
            showCancelButton: true,
            closeOnConfirm: true,
            closeOnCancel: true,
            confirmButtonText: promptBtn.Comfirm,
            cancelButtonText: promptBtn.Cancle
        },
        function (isConfirm) {
            if (isConfirm) {
                callback && callback();
            }
            else {
                cancelcall && cancelcall();
            }
        });
    };

    //Amanda
    //保存提示窗
    this.saveinfo = function (title, tip, callback) {
        swal({
            title: title,
            text: tip,
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            confirmButtonText: promptBtn.Comfirm,
            cancelButtonText: promptBtn.Cancle
        }, function () {
            callback && callback();    
       });
    };

};
var msg = new mf.message();
