var URL = "/BackgroundMap/Basemap";
var MID = window.top.page_parameters.GetParameters(URL);
var model = null;
var parameters = null;
mf.toolBar("#container");


var viewModel = function () {
    var self = this;
    var actions = mf.actionButton();
    var formData = {

    };
    ko.applyBindings(formData);
  

    //主列表
    var table = new mf.Table("#BasemapTable", {
        uniqueId: "AttachmentID",
        isFrozenColumn: true,
        editable: false,
        height: window.innerHeight - 100,
        paginationBar: new mf.PaginationBar("#paginagionBar"),
        operateColumWidth: "100px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:100px;text-align:center;">');
            var actionLength = actions.length;
            for (var i = 0; i < actionLength; i++) {
                $btn = $('<button class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.' +
                        actions[i].Code + 'Click(this)" ><i class="fa ' + actions[i].Icon + '"></i>  ' + actions[i].Name + '  </button> ');
                $td.append($btn);
            }
            return $td;
        },
        fn_getData: function (pagination, searchData, success) {
            if (!searchData) 
                searchData = {};
            
            mf.ajax({
                type: 'Get',                
                url: '/MES/api/Util/GetBaseMapList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    success(data);
                }
            });
        },

        fn_saveData: function () { },
       
       // isRealDelete: true, //是否单个实时删除
        //fn_realDelete: function (rowData, success) {
        //    var Attachment_ID = rowData.AttachmentID;
        //    mf.ajax({
        //        type: "post",
        //        url: "/MES/api/Util/MapDelete",
        //        data: JSON.stringify({ AttachmentID: Attachment_ID }),
        //        success: function (data) {
        //            success(data);
        //        }
        //    });
        //},

        LastWidth: "901",
        IsSetTableWidth: true,
        columns: [
            {
                field: 'Comments', title: fields.MapRemark, align: "center",
                rander: new mf.TextRander({ size: 20, maxLength: 120, title: true })
            }
        ]
    });
    table.loadData();



    // 刷新
    this.refreshClick = function () {
        if (!table) {
            return;
        }
        table.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };

  
    // 删除
    this.deleteClick = function () {

        //if (!table) {
        //    return;
        //}
        //table.deleteRow();

        var row = table.getSelectedData();
        var Attachment_ID = row.AttachmentID;

        msg.warning(fields.Prompt, fields.WhetherToDelete, function () {
            mf.ajax({
                type: "post",
                url: "/MES/api/Util/MapDelete",
                data: JSON.stringify({ AttachmentID: Attachment_ID }),
                success: function (data) {
                    if (data.status === "200") {
                        msg.success(fields.Prompt, data.msg, function () {
                            table.loadData();
                        });
                    }
                    else {
                        msg.error(fields.Prompt, data.msg)
                    }
                }
            });
        });

        
    };

    //上传    
    this.uploadClick = function () {

        $("#FileName").text(fields.PleaseSelectImg);
        $("#BtnFile").val("");
        $("#Desc").val("");
        

        $("#BtnFile").unbind();
        $("#BtnBrowse").unbind();
        $("#BtnImport").unbind();

        $("#BtnFile").change(function () {
            var fileName = $("#BtnFile").val();
            if (fileName && fileName.length > 0) {
                $("#FileName").text(fileName);
            }
            else {
                $("#FileName").text(fields.PleaseSelectImg);
            }
        });
        $("#BtnBrowse").click(function () {
            $("#BtnFile").click();
        });


        $("#BtnImport").click(function () {

            var descrip = $("#Desc").val();

            if (descrip.length == 0) {
                msg.info(fields.Prompt, fields.PleaseFillDesc);
                return false;
            }
            if (!document.getElementById('BtnFile').files[0]) {
                msg.info(fields.Prompt, fields.PleaseSelectImg);
                return false;
            }

            var formdata = new FormData();
            formdata.append("file", document.getElementById('BtnFile').files[0]);
            formdata.append("Token", token);
            formdata.append("Comments", descrip);

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/Util/UploadMap',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                beforeSend: function (data) {
                    // 禁用按钮防止重复提交
                    var w = window.innerWidth;
                    var h = window.innerHeight;
                    var h2 = h / 2;              
                    $("body").append("<div id='ajax_tip' style='z-index: 99999; opacity: 0.5; background-color: #000; width:" + w +
                        "px;height:" + h + "px;position: absolute;top: 0; left: 0; text-align:center;'>" +
                    "<div style='margin-top:" + h2 + "px;'><span style='font-size:22px;'>Loading..</span></div></div>");                    
                },
                success: function (ret) {
                    $("#ajax_tip").remove();
                    if (ret.status == 200) {
                        msg.success(fields.Prompt, ret.msg, function () {
                            table.loadData();
                            $('#ImportDialog').modal('hide');
                        });
                    }
                    else {
                        var message = ret.msg;
                        if (message.length > 250) {
                            message = message.substring(0, 250) + "……"
                        }
                        msg.error(fields.Prompt, message);
                    }
                }
            });
        });

        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');
    };

    //查看
    this.toViewClick = function (obj) {

        var $tr = $(obj).parent().parent();
        var row = table.getRowData($tr);

        if (row.Path.indexOf("bmp") >= 0 ||
              row.Path.indexOf("jpg") >= 0 ||
              row.Path.indexOf("png") >= 0 ||
              row.Path.indexOf("jpeg") >= 0 ||
              row.Path.indexOf("gif") >= 0 ||
              row.Path.indexOf("pic") >= 0) {
           
            $("#imageFile").attr("src", window.top.mf.domain + '/MES/' + row.Path);

            $("#ImgDialog").modal({ backdrop: 'static', keyboard: false });
            $("#ImgDialog").modal('show');
        }
        else {
            msg.info(fields.Prompt, fields.IsNotPicture);
            return false;
        }
      
    };

}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Import", "Export",
    "Remark", "Status", "Cancel", "Browse", "Comfirm", "Prompt", "PleaseSelectFile",
    "description", "UploadImg", "PleaseFillDesc", "PleaseSelectImg", "ViewImg", "IsNotPicture",
    "MapRemark", "WhetherToDelete", "Success", "RecordFailed"
];
words = arrayWord.join();

initPage = function () {
    model = new viewModel();
};