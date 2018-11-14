var model = null;
var parameters = null;

var viewModel = function () {
    var self = this;
    var IsInit = true;
    
    var formData = {
        Code: ko.observable(""),
        Default: [{ value: "true", text: "Y" }, { value: "false", text: "N" }]
    };
    ko.applyBindings(formData);

    //设备主档
    var EquipmentContentHeight = $(".EquipmentContent").parent().height() - 45;
    var EquipmentMasterFileTable = new mf.Table("#EquipmentMasterFileTable", {
        editable: false,
        allowRowClick: true,
        uniqueId: "ID",
        focusField: "Code",
        focusEditField: "Status",
        LastWidth: "180",
        IsSetTableWidth: true,
        height: EquipmentContentHeight,
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.Code = formData.Code();
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00001List',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) { },
        fn_onRowClick: function (row) {
            $("#TextEquipmentCode").val(row.Code);
            $("#TextEquipmentDescription").val(row.Name);
            $("#TextEquipmentRemark").val(row.Comments);
            $("#TextEquipmentCode").attr("title", row.Code);
            $("#TextEquipmentDescription").attr("title", row.Name);
            $("#TextEquipmentRemark").attr("title", row.Comments);

            EquipmentPictureTable.goForwordSafely(
                function () {
                    EquipmentPictureTable.loadData();
                }, function () {
                    EquipmentPictureTable.loadData();
                });
        },
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", require: true, width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 10, maxLength: 20, title: true })),
                checkers: [
                    new mf.TextNotEmptyChecker(fields.EquipmentCodeIsNull)
                ]
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "150",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 16, maxLength: 60, title: true }))
            },
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: true })),
            }
        ]
    });
    EquipmentMasterFileTable.loadData();

    //设备图样列表
    var EquipmentPictureContentHeight = $(".EquipmentContent").parent().height() - 106;
    var EquipmentPictureTable = new mf.Table("#EquipmentPictureTable", {
        isFrozenColumn: true,
        editable: false,
        uniqueId: "ID",
        LastWidth: "130",
        IsSetTableWidth: true,
        height: EquipmentPictureContentHeight,
        paginationBar: new mf.PaginationBar("#paginagionEquipmentPictureBar"),
        operateColumTitle: fields.EquipmentPicture,
        operateColumWidth: "90px",
        fn_createBtn: function (rowData) {
            var $td = $('<td style="width:90px;text-align:center;">');
            var $btn = $('<button class="btn btn-success btn-xs" style="margin-right: 5px" onclick="model.ViewEquipmentPictureClick(this)">' + fields.EquipmentPicture + '</button>');
            return $td.append($btn);
        },
        fn_getData: function (pagination, searchData, success) {
            if (IsInit) {
                console.log("Init EquipmentPictureTable");
                success([]);
                return;
            }

            var row = EquipmentMasterFileTable.getSelectedData();
            if (!row) {
                console.log("row is null");
                success([]);
                return;
            }

            searchData = {};
            searchData.EquipmentID = row.EquipmentID;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;
            
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00001GetPatternList',
                data: searchData,
                success: function (data) {
                    success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {},
        columns: [
            {
                field: 'Name', title: fields.DefaultName, align: "center", width: "150",
                rander: new mf.TextRander({ size: 10, maxLength: 20, title: true })
            },
            {
                field: 'Default', title: fields.Default, align: "center", width: "80",
                rander: new mf.SingleCheckBoxRander({ yes: 1, no: 0 })
            },
            {
                field: 'Creator', title: fields.CreatedBy, align: "center", width: "100",
                rander: new mf.StaticValueRander(),
            },
            {
                field: 'CreateTime', title: fields.CreatedDate, align: "center", width: "130",
                rander: new mf.TextTimeRander(),
            },
            {
                field: 'Modifier', title: fields.LastChangedBy, align: 'center', width: "110",
                rander: new mf.StaticValueRander()
            },
            {
                field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                rander: new mf.TextTimeRander(),
            }
        ]
    });
    EquipmentPictureTable.loadData();

    //查询
    this.searchClick = function () {
        EquipmentPictureTable.goForwordSafely(function () {
            EquipmentMasterFileTable.loadData();
            EquipmentPictureTable.clean();
        }, function () {
            EquipmentMasterFileTable.loadData();
            EquipmentPictureTable.clean();
        });
    };

    //刷新
    this.refreshClick = function () {
        window.location.reload();
    };

    //显示图像
    this.showPicture = function (obj, fileQuery, transImg) {
        var imgSrc = '', imgArr = [], strSrc = '';
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) { // IE浏览器判断
            if (obj.select) {
                obj.select();
                var path = document.selection.createRange().text;
                obj.removeAttribute("src");
                imgSrc = fileQuery.value;
                imgArr = imgSrc.split('.');
                strSrc = imgArr[imgArr.length - 1].toLowerCase();
                if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                    obj.setAttribute("src", transImg);
                    obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + path + "', sizingMethod='scale');"; // IE通过滤镜的方式实现图片显示
                } else {
                    console.error('File type Error! please image file upload');
                }
            }
            else {
                imgSrc = fileQuery.value;
                imgArr = imgSrc.split('.');
                strSrc = imgArr[imgArr.length - 1].toLowerCase();
                if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                    obj.src = fileQuery.value;
                } else {
                    console.error('File type Error! please image file upload');
                }
            }
        }
        else {
            var file = fileQuery.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {

                imgSrc = fileQuery.value;
                imgArr = imgSrc.split('.');
                strSrc = imgArr[imgArr.length - 1].toLowerCase();
                if (strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
                    obj.setAttribute("src", e.target.result);
                } else {
                    console.error('File type Error! please image file upload');
                }

                console.log(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }

    //新增
    this.addClick = function () {
        var row = EquipmentMasterFileTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        
        var number = 1;
        var pictureRow = EquipmentPictureTable.getRowData($("#EquipmentPictureTable").find("tr").last());
        if ($("#EquipmentPictureTable").find("tr").length > 0) {
            number = Number(pictureRow.Name.substring(pictureRow.Name.length - 3, pictureRow.Name.length)) + 1;
            if (number >= 1000) {
                msg.info(fields.Prompt, fields.NumberIsMax);
                return;
            }
        }

        var drawingboard_add = new mf.DrawingBoard("AddDrawing",{
            canvasWidth: 560,
            canvasHeight: 350
        });

        $("#AddClose").unbind();
        $("#AddClose").click(function () {
            $("#AddEquipmentPictureDialog").modal('hide');
        });
        $("#AddCancel").unbind();
        $("#AddCancel").click(function () {
            $("#AddEquipmentPictureDialog").modal('hide');
            $("#AddComfirm").removeAttr("disabled");
        });
        $("#AddComfirm").unbind();
        $("#AddComfirm").click(function () {
            
            var DefaultName = $("#AddDefaultName").val();
            var Default = $("#AddDefault").val();
            
            if(!(DefaultName && DefaultName.length > 0)){
                msg.info(fields.Prompt, fields.DefaultNameIsNull);
                return;
            }

            var fileData = drawingboard_add.getImageFile();
            if (!(fileData && fileData.length > 0)) {
                msg.info(fields.Prompt, fields.IsNotImage);
                return;
            }
            
            //var formdata = new FormData();
            //formdata.append("file", fileData);
            //formdata.append("EquipmentID", row.EquipmentID);
            //formdata.append("Name", DefaultName);
            //formdata.append("Default", Default);
            //formdata.append("Token", token);
            //console.log(formdata);
            //console.log(JSON.stringify(formdata));

            var formdata = {
                img: fileData,
                EquipmentID: row.EquipmentID,
                Name: DefaultName,
                Default: Default
            }
            console.log(JSON.stringify(formdata))
            mf.ajax({
                type: 'Post',
                url: '/MES/api/ImportFile/Ems00001PatternAdd',
                data: JSON.stringify(formdata),
                beforeSend: function () {
                    // 禁用按钮防止重复提交
                    $("#AddComfirm").attr("disabled", true);
                },
                success: function (data) {
                    console.log(data);
                    if (data.status == 200) {
                        msg.success(fields.Prompt, data.msg, function () {
                            EquipmentPictureTable.loadData();
                            $('#AddEquipmentPictureDialog').modal('hide');
                        });
                    }
                    else {
                        msg.error(fields.Prompt, data.msg);
                    }
                },
                complete: function () {
                    $("#AddComfirm").removeAttr("disabled");
                }
            });
            //$.ajax({
            //    type: 'POST',
            //    url: window.top.mf.domain + '/MES/api/ImportFile/Ems00001PatternAdd',
            //    data: formdata,
            //    contentType: false,
            //    processData: false,
            //    enctype: 'multipart/form-data',
            //    success: function (ret) {
            //        if (ret.status == 200) {
            //            msg.success(fields.Prompt, ret.msg, function () {
            //                EquipmentPictureTable.loadData();
            //                $('#AddEquipmentPictureDialog').modal('hide');
            //            });
            //        }
            //        else {
            //            msg.error(fields.Prompt, ret.msg);
            //        }
            //    }
            //});
        });
 
        var $tr = $("#EquipmentPictureTable").find("tr");
        var $lasttr = $tr.eq($tr.length - 1);
        var data = $lasttr.find("td").eq(0).text();
        data = parseInt(data);
        if (isNaN(data)) {
            data = 1;          
        }
        else {
            data = data + 1;
        }
        $("#AddDefaultName").val(row.Code + data);
        $("#AddEquipmentPictureDialog").modal({ backdrop: 'static', keyboard: false });
        $("#AddEquipmentPictureDialog").modal('show');
    }

    // 编辑
    this.editClick = function () {
        var row = EquipmentPictureTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        
        $("#EditDefaultName").val(row.Name);
        if (row.Default) {
            $("#EditDefault").val("true");
        }
        else {
            $("#EditDefault").val("false");
        }
        
        //var image = new Image();
        //image.src = mf.domain + "/MES/" + row.Path;
        //image.onload = function () {
        //    editcontext.drawImage(image, 0, 0, image.width, image.height, 0, 0, 500, 377);
        //}
        var drawingboard_edit;
        mf.ajax({
            type: 'get',
            async:false,
            url: '/MES/api/Util/ImgToBase64String',
            data: { AttachmentID: row.AttachmentID },
            success: function (data) {
                console.log(data);
                data = "data:image/png;base64," + data;
                drawingboard_edit = new mf.DrawingBoard("EditDrawing", {
                    //imageSrc: mf.domain + "/MES/" + row.Path,
                    imageSrc: data,
                    canvasWidth: 560,
                    canvasHeight: 350
                });
            }
        });
      
        $("#EditClose").unbind();
        $("#EditClose").click(function () {
            $("#EditEquipmentPictureDialog").modal('hide');
        });
        $("#EditCancel").unbind();
        $("#EditCancel").click(function () {
            $("#EditEquipmentPictureDialog").modal('hide');
            $("#EditComfirm").removeAttr("disabled");
        });
        $("#EditComfirm").unbind();
        $("#EditComfirm").click(function () {

            var DefaultName = $("#EditDefaultName").val();
            var Default = $("#EditDefault").val();
            
            if (!(DefaultName && DefaultName.length > 0)) {
                msg.info(fields.Prompt, fields.DefaultNameIsNull);
                return;
            }

            var fileData = drawingboard_edit.getImageFile();
            if (!(fileData && fileData.length > 0)) {
                msg.info(fields.Prompt, fields.IsNotImage);
                return;
            }
            
            var formdata = {
                img: fileData,
                AttachmentID: row.AttachmentID,
                Name: DefaultName,
                Default: Default
            }

            mf.ajax({
                type: 'Post',
                url: '/MES/api/ImportFile/Ems00001PatternUpdate',
                data: JSON.stringify(formdata),
                beforeSend: function () {
                    // 禁用按钮防止重复提交
                    $("#EditComfirm").attr("disabled", true);
                },
                success: function (data) {
                    console.log(data);
                    if (data.status == 200) {
                        msg.success(fields.Prompt, data.msg, function () {
                            //EquipmentPictureTable.loadData();
                            $('#EditEquipmentPictureDialog').modal('hide');
                            window.location.reload();
                        });
                    }
                    else {
                        msg.error(fields.Prompt, data.msg);
                    }
                },
                complete: function () {
                    $("#EditComfirm").removeAttr("disabled");
                }
            });

        //    var formdata = new FormData();
        //    formdata.append("file", fileData);
        //    formdata.append("AttachmentID", row.AttachmentID);
        //    formdata.append("Name", DefaultName);
        //    formdata.append("Default", Default);
        //    formdata.append("Token", token);

        //    $.ajax({
        //        type: 'POST',
        //        url: window.top.mf.domain + '/MES/api/ImportFile/Ems00001PatternUpdate',
        //        data: formdata,
        //        contentType: false,
        //        processData: false,
        //        enctype: 'multipart/form-data',
        //        success: function (ret) {
        //            if (ret.status == 200) {
        //                msg.success(fields.Prompt, ret.msg, function () {
        //                    EquipmentPictureTable.loadData();
        //                    $('#EditEquipmentPictureDialog').modal('hide');
        //                });
        //            }
        //            else {
        //                msg.error(fields.Prompt, ret.msg);
        //            }
        //        }
        //    });
        });

        $("#EditEquipmentPictureDialog").modal({ backdrop: 'static', keyboard: false });
        $("#EditEquipmentPictureDialog").modal('show');
    };

    // 删除
    this.deleteClick = function () {
        var row = EquipmentPictureTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }

        msg.warning(fields.Prompt, fields.IsDelete + row.Name,
            function () {
                mf.ajax({
                    type: 'POST',
                    url: '/MES/api/EquipmentManagement/Ems00001PatternDelete',
                    data: JSON.stringify({ AttachmentID: row.AttachmentID }),
                    success: function (ret) {
                        if (ret.status == 200) {
                            msg.success(fields.Prompt, ret.msg, function () {
                                EquipmentPictureTable.loadData();
                            });
                        }
                        else {
                            msg.error(fields.Prompt, ret.msg);
                        }
                    }
                });
            },null);
    };

    //查看设备图样
    this.ViewEquipmentPictureClick = function (obj) {
        $row = $(obj).parents("tr");
        var row = EquipmentPictureTable.getRowData($row);
        mf.ajax({
            type: 'get',
            async: false,
            url: '/MES/api/Util/ImgToBase64String',
            data: { AttachmentID: row.AttachmentID },
            success: function (data) {
                data = "data:image/png;base64," + data;
                $("#ViewImage").attr("src", data);
            }
        });
        
        $("#ViewEquipmentPictureDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ViewEquipmentPictureDialog").modal('show');
    }

    IsInit = false;
}

var arrayWord = [
    "Refresh", "Search", "Save", "New", "Change", "Deletion", "Langwage", "Import", "Export",
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Normal", "Invalid", "Cancel", "Browse", "Comfirm", "LanguageCode", "IsDefault",
    "PleaseSelectLanguage", "PleaseFillLanguageContent", "LanguageRepeats", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "EquipmentCode", "EquipmentDescription", "ProjectCode", "ProjectDescription", "ProjectAttributes",
    "SensorNo", "SensorDescription", "IfCollection", "CollectionWay", "StandardValue", "MaxValue", "MinValue",
    "MaxAlarmTime", "MinAlarmTime", "ProjectIsNull", "ProjectInformation", "Brand", "ModelType", "VendorNo",
    "VendorDescription", "SensorInformation", "StandardValueIsIncorrect", "MaxValueIsIncorrect", "MinValueIsIncorrect",
    "MaxAlarmTimeIsIncorrect", "MinAlarmTimeIsIncorrect", "Default", "DefaultName", "EquipmentPicture",
    "AddEquipmentPicture", "EditEquipmentPicture", "DefaultNameIsNull", "IsDelete", "IsNotImage"
];
words = arrayWord.join();

initPage = function () {
    mf.ajax({
        type: 'get',
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000001,0191213000013,0191213000052,0191213000055,0191213000056" },
        success: function (data) {
            parameters = data;
            model = new viewModel();
        }
    });
};
