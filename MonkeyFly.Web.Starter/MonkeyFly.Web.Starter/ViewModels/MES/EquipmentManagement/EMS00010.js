
var viewModel = function () {
    var self = this;
    var Mt_ID = "", Add_Mt_ID = "", MaiOrderEquipmentID = "", MaintenanceOrderID = "", ExportTotal, DetailTable;
    var saveObj = {}
    var Conditions = "";
    var getCondition = "",
        StartDate = "",
        EndDate = "",
        MaintenanceUser = "",
        //AccountCode = "",
        AccountID = "",
        userCode = "";



    var userName = window.top.$parentNode.querySelector("#username").innerText.split(":")[1];
    var OPValue = "", CLValue = "";
    var parameters = mf.format.getMesParameters("0191213000058,0191213000001,0191213000004");
    for (var i = 0; i < parameters.PT0191213000004.length;i++){
        if (parameters.PT0191213000004[i].Code == "OP") {
            OPValue = parameters.PT0191213000004[i].value;
            console.log(1)
        }
        if (parameters.PT0191213000004[i].Code == "CL") {
            CLValue = parameters.PT0191213000004[i].value;
        }
    }
   // console.log(parameters)
   // mf.deal.initStartEndData($("#StartMaintenanceDate"), $("#EndMaintenanceDate"));
    var formData = {
        MaintenanceType: ko.observable(),
        OP: ko.observable(),
        CL: ko.observable(),
        OPChecked: function () {
            this.OP(OPValue);
        },
        OPUnChecked: function () {
            this.OP('');
        },
        CLChecked: function () {
            this.CL(CLValue);
        },
        CLUnChecked: function () {
            this.CL('');
        },
        MaintenanceEquipment: ko.observable(),
        MaintenanceUser: ko.observable(),
        StartMaintenanceNo: ko.observable(),
        EndMaintenanceNo: ko.observable(),
        StartMaintenanceDate: ko.observable(),
        EndMaintenanceDate: ko.observable(),
        searchEquipmentCode: ko.observable(),
        searchWorkNumber: ko.observable(),
        searchCategoryCode: ko.observable(),
        searchEmployeeName: ko.observable(),
        MaintenanceUserID: ko.observable(),
        AccountCode: ko.observable(),
        Emplno:ko.observable()
    };
    ko.applyBindings(formData);

    //预设保养人员
    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetUser",
        data: {},
        success: function (data) {
            console.log(data)
            formData.MaintenanceUser(data.Emplno)
            formData.MaintenanceUserID(data.MESUserID)
        }
    })

    var today = new Date();
    today = today.getFullYear() + '-' +
            (((today.getMonth() + 1) < 10) ? '0' + (today.getMonth() + 1) : today.getMonth() + 1) + '-' +
            ((today.getDate() < 10) ? '0' + today.getDate() : today.getDate());
    // $("#StartMaintenanceDate").val(today);

    //开始日期绑定
    $("#StartMaintenanceDate").datetimepicker({
        language: 'zh-tw',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 3,
   
    }).on("click", function () {
        $("#StartMaintenanceDate").datetimepicker("setEndDate", $("#EndMaintenanceDate").val())
    });

    //结束日期
    $("#EndMaintenanceDate").datetimepicker({
        language: 'zh-tw',
        format: "yyyy-mm-dd",
        autoclose: true,
        todayBtn: true,
        minView: 3,
   
    }).on("click", function () {
        $("#EndMaintenanceDate").datetimepicker("setStartDate", $("#StartMaintenanceDate").val())
    });


    //$("#StartMaintenanceDate").datepicker({
    //    language: language,
    //    format: "yyyy-mm-dd",
    //    autoclose: true,
    //    todayBtn: true,
    //    minView: 3
    //});
   // $("#EndMaintenanceDate").val(today);
    //$("#EndMaintenanceDate").datepicker({
    //    format: "yyyy-mm-dd",
    //    autoclose: true,
    //    todyBtn: true,
    //    language: language
    //});

    formData.StartMaintenanceDate(today);
    formData.EndMaintenanceDate(today);

    var flags = true;//保养人员查询条件默认显示登录名的时候，获取保养人员窗口的数据，遍历该数据，选取对应名字的id号，当开窗选取保养人员的时候，flags变为false，不在执行以上的遍历

    var GetChecked = function () {
        var checkedValue = '';
        if (formData.OP()) {
            checkedValue += formData.OP();
            if (formData.CL()) {
                checkedValue += ("," + formData.CL());
            }
        }
        if (!formData.OP() && formData.CL()) {
            checkedValue += formData.CL();
        }
        return checkedValue;
    };

    //新增設備保養明細
    var AddEquipmentMaintenanceTable = new mf.Table("#AddEquipmentMaintenanceDetailsTable", {
        uniqueId: "AddDetailID",
        editable: false,
        //Add_Mt_ID->Mt_ID
        paginationBar: new mf.PaginationBar("#paginagionMaintenanceDetails"),
        fn_getData: function (pagination, searchData, success) {
            searchData = {};
            searchData.rows = pagination.rows;
            searchData.page = pagination.page;
            searchData.MaintenanceOrderID = MaiOrderEquipmentID;
            
            mf.ajax({
                type: 'get',
                url: '/MES/api/PopUp/EMSGetEquMaiProjectList',
                data: searchData,
                success: function (data) {
  
                    success(data);
                }
            });
          //  var data = [{ AddDetailID: 1, Item: "ABC" }, { AddDetailID: 2, Item: "BCD" }];
           // success(data);
        },
        fn_saveData: function (saveData, success) { },
        enableMultiSelectColumn: true,
        multiSelectColumnIndex: 0,
        multiSelectColumnTitle: '<input type="checkbox" id="IsChecked"  onclick="model.checkboxClick(this);"/>',
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.MaintenanceItem, align: "center", require: true, width: "130",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Name', title: fields.ItemDirections, require: true, align: "center", width: "140",
                rander: new mf.TextRander({title: true })
            },
            {
                field: 'Attribute', title: fields.AttributeFlag, align: "center", width: "100",
                rander: new mf.TextRander({title: true })
            },
 /*           {
                field: 'IsEnable', title: fields.Attribute, align: "center", width: "130",
                rander: new mf.TextRander({  title: true })
            },*/
            {
                field: 'Comments', title: fields.Remark, align: "center",
                rander: new mf.TextRander({ title: true })
            }
        ]
    });
    

    //保养人员开窗资料
    var WorkNumberTable = new mf.Table("#WorkNumberTable", {
        uniqueId: "MESUserID",
        editable: false,
        paginationBar: new mf.PaginationBar("#WorkNumberPageBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var SearchCode = formData.searchWorkNumber();
            if (SearchCode && SearchCode.length > 0) {
                searchData.Code = SearchCode + "";
            }

            SearchCode = formData.searchEmployeeName();
            if (SearchCode && SearchCode.length > 0) {
                searchData.UserName = SearchCode + "";
            }

            // searchData.Token = token;
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetUserList',
                data: searchData,
                success: function (data) {
                    //console.log(data)
                    success(data);
                    //var num;
                    //for (var i = 0; i < data.rows.length; i++) {

                    //    if (data.rows[i].Account == userName.trim()) {

                    //        num = i
                    //    }
                    //}

                    //if (flags) {
                    //    formData.AccountCode(data.rows[num].MESUserID)
                    //    formData.Emplno(data.rows[num].Emplno)
                    //}
                                       
                    //formData.MaintenanceUser(userName)

                    //MainTable.loadData();

                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Emplno",
        height: 300,
        columns: [
            {
                field: 'Emplno', title: fields.WorkNumber, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'UserName', title: fields.Name, align: "center",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });
 
  


    //保养人员开窗查询
    $("#searchWorkNumberClick").click(function () {
        WorkNumberTable.goForwordSafely(function () {
            WorkNumberTable.loadData(null, null, 1);
        }, null);
    });

    //保养人员开窗
    this.SearchAccountMaster = function () {
        $("#SearchAccountMasterDialog").modal("show");
        $("#SearchAccountMasterDialog").modal({ backdrop: 'static', keyboard: false });
        WorkNumberTable.loadData();

        $("#WorkNumberComfirmClick").unbind();
        $("#WorkNumberComfirmClick").click(function () {
            var row = WorkNumberTable.getSelectedData();
            console.log(row)
            if (row) {
                $("#MaintenanceUser").val(row.Emplno);
                userCode = row.MESUserID
                $("#SearchAccountMasterDialog").modal("hide");
                $("#WorkNumber").val("");
                $("#EmployeeName").val("");
                formData.searchWorkNumber = ko.observable();
                formData.searchEmployeeName = ko.observable();
                formData.MaintenanceUserID(row.MESUserID);
                formData.Emplno(row.Emplno);
                // $("#MaintenanceUserID").val(row.MESUserID)
                formData.MaintenanceUserID(row.MESUserID)
                flags = false;
            }
        });
    }


    
    //主列表
    var MainTable = new mf.Table("#MainTable", {
        uniqueId: "MtID",
        isFrozenColumn: true,
        editable:false,
        operateColumWidth: "150px",
        fn_createBtn: function (rowData) {
            
            if (!rowData.Condition) return;
            var Condition = rowData.Condition.substring(5, rowData.Condition.length);
           // var isStart = rowData.IsStart;
          //  var isEnd = rowData.IsEnd;
          //  console.log(isStart + "--" + isEnd)
         
            var $td = $('<td style="width:150px;text-align:center;">');
            if (Condition == "0201213000025" || Condition == "02012130000A5" || Condition == "02012130000A6") {
                var $BtnStartMaintenance = $('<button style="margin-right:5px;" id="StartMaintenance" class="operation btn btn-success btn-xs" onclick="model.StartMaintenanceClick(this)">' + fields.StartMaintenance + '</button>');
                $td.append($BtnStartMaintenance);
            } else {
                var $BtnStartMaintenance = $('<button style="margin-right:5px;" id="StartMaintenance" class="operation btn btn-success btn-xs" onclick="model.StartMaintenanceClick(this)">' + fields.StartMaintenance + '</button>');
                $td.append($BtnStartMaintenance);
            }
            if (Condition == "0201213000024") {
                var $BtnEndMaintenance = $('<button style="margin-right:5px;" id="EndMaintenance" class="operation btn btn-success btn-xs" onclick="model.EndMaintenanceClick(this)" >' + fields.EndMaintenance + '</button>');
                $td.append($BtnEndMaintenance);
            } else {
                var $BtnEndMaintenance = $('<button style="margin-right:5px;" id="EndMaintenance" class="operation btn btn-success btn-xs" onclick="model.EndMaintenanceClick(this)">' + fields.EndMaintenance + '</button>');
                $td.append($BtnEndMaintenance);
            }
          //  var $BtnStartMaintenance = $('<button style="margin-right:5px;" id="StartMaintenance" class="operation btn btn-success btn-xs" onclick="model.StartMaintenanceClick(this)">' + fields.StartMaintenance + '</button>'); 
          //  var $BtnEndMaintenance = $('<button style="margin-right:5px;" id="EndMaintenance" class="operation btn btn-success btn-xs" onclick="model.EndMaintenanceClick(this)">' + fields.EndMaintenance + '</button>'); 
          //  $td.append($BtnStartMaintenance);
          //  $td.append($BtnEndMaintenance);
            return $td;
            
        },
        height: 190,
        paginationBar: new mf.PaginationBar("#paginagionMainBar"),
        fn_onRowClick: function (row) {
            var $row = $("#MainTable").find(".active");
            if (!($row && $row.length > 0)) {
                return;
            }
            Mt_ID = row.MaiOrderEquipmentID;
            Conditions = row.Status.substring(5, 18);
            MaintenanceOrderID = row.MaintenanceOrderID
/*
            saveObj.MaintenanceNo = row.MaintenanceNo;
            saveObj.Type = row.Type;
            saveObj.EquipmentMaintenanceListID = row.EquipmentMaintenanceListID;
            saveObj.OrganizationID = row.OrganizationID;
            saveObj.ManufacturerID = row.ManufacturerID;
            saveObj.MESUserID = row.MESUserID;
            saveObj.Status = row.Status;
*/
            DetailTable.loadData();

            if (Conditions == "0201213000029") {
                DetailTable.setOption({ editable: true });
                $("#btn_saveDetail").removeAttr("disabled");
                $("#btn_addDetail").removeAttr("disabled");
                $("#btn_editDetail").removeAttr("disabled");
                $("#btn_deleteDetail").removeAttr("disabled");
            } else {
                DetailTable.setOption({ editable: false })
                $("#btn_saveDetail").attr({ "disabled": "disabled" });
                $("#btn_addDetail").attr({ "disabled": "disabled" });
                $("#btn_editDetail").attr({ "disabled": "disabled" });
                $("#btn_deleteDetail").attr({ "disabled": "disabled" });
            }
        },
        fn_getData: function (pagination, searchData, success) {

            //获取一次保养人员的数据，预设系统登录人，需要把对应的人员流水号传给后端
            //mf.ajax({
            //    type: 'Get',
            //    url: '/MES/api/PopUp/GetUserList',
            //    data: {},
            //    success: function (data) {
                    
            //        var num;
            //        for (var i = 0; i < data.rows.length; i++) {

            //            if (data.rows[i].Account == userName.trim()) {

            //                num = i
            //            }
            //        }

            //        AccountCode = data.rows[num].MESUserID

            //        console.log(AccountCode)
            //    }
            //});


            //if (flags) {
            //    AccountID = AccountCode;
            //} else {
            //    AccountID = userCode
            //}
            searchData = {};
            searchData.rows = pagination.rows;
            searchData.page = pagination.page;
            searchData.TypeCode = $("#MaintenanceType").val()//formData.MaintenanceType();
            searchData.EquipmentCode = $("#MaintenanceEquipment").val()//formData.MaintenanceEquipment();
            searchData.UserCode = $("#MaintenanceUser").val()//formData.MaintenanceUserID()//AccountID//formData.MaintenanceUser();
            searchData.StartCode = formData.StartMaintenanceNo();
            searchData.EndCode = formData.EndMaintenanceNo();
            searchData.StartDate = formData.StartMaintenanceDate(); //StartDate;
            searchData.EndDate = formData.EndMaintenanceDate();//EndDate;
            searchData.Status = GetChecked();
            console.log(searchData)
            mf.ajax({
                type: 'get',
                url: '/MES/api/EquipmentManagement/Ems00010GetList',
                data: $.extend({ page: pagination.page, rows: pagination.rows }, searchData),
                success: function (data) {
                    console.log(data)
                    ExportTotal = data.total;
                    success(data);
                    mt_id = "";
                    DetailTable.clean()
                    //DetailTable.loadData();
                    success(data);
                }
            });

            var data = [{ MtID: 1, MaintenDate: "2017-07-07", TypeDesc: "ABC0010", MtNo: "0010", ExpireDate:"2017-07-08"}];
            
        },
        LastWidth: "130",
        IsSetTableWidth: true,
        fn_saveData: function (saveData, success) {},
        columns: [
            {
                field: 'MaintenanceDate', title: fields.MaintenDate, align: "center", width: "140",
                rander: new mf.DateRander()
            },
            {
                field: 'TypeName', title: fields.TypeDesc, align: "center", width: "130",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'MaintenanceNo', title: fields.MtNo, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'StatusName', title: fields.Status, align: "center", width: "130",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Sequence', title: fields.SequenceNo, align: "center", width: "50",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'EquipmentCode', title: fields.EquipmentCode, align: "center", width: "140",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'EquipmentName', title: fields.EquipmentName, align: "center", width: "160",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'MESUserCode', title: fields.ResponsibleWorkNumber, align: "center", width: "140",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'MESUserName', title: fields.Name, align: "center", width: "140",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'EquOrganizationCode', title:"", align: "center", width: "140",visible:false,
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'EquOrganizationName', title: fields.MaintenanceDepartment, align: "center", width: "140",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ManufacturerCode', title:"", align: "center", width: "140",visible:false,
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ManufacturerName', title: fields.MaintenanceSupplier, align: "center", width: "140",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'OrganizationCode', title: "", align: "center", width: "140",visible:false,
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'OrganizationName', title: fields.MaintenanceDept, align: "center", width: "140",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'Model', title: fields.Model, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'MachineNo', title: fields.SerialNo, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'FixedAssets', title: fields.FixedAssets, align: "center", width: "120",
                rander: new mf.TextRander({ title: true })
            },
            {
                field: 'ExpireDate', title: fields.ExpireDate, align: "center",
                rander: new mf.DateRander()
            }
        ]
    });

    MainTable.loadData()

    var Randers = new mf.TextRander({ title: true});

    var checkChang = false;//明细输入类型为数值型的话就执行判断

    this.checkNumber = function () {
        var reg = /\D/g;
        if (checkChang) {
            var N = $("#AttributeValue").val().trim();
            if (isNaN(N)) {
                msg.info(fields.Prompt, fields.ThereOnlyInputNumber)
                $("#AttributeValue").val(N.replace(reg, ''))
                return
                
            }
        }
    };

    



    //明细
    //function initTable(tableStr, paginationBarStr) {
    //    paginationBar = new mf.PaginationBar(paginationBarStr);
        //明细
        DetailTable = new mf.Table("#DetailTable", {
            uniqueId: "MaiOrderProjectID",
            //editable: false,
            height: window.innerHeight - 450,
            paginationBar: new mf.PaginationBar("#paginagionDetailBar"),
            fn_getData: function (pagination, searchData, success) {

                mf.ajax({
                    type: 'get',
                    url: '/MES/api/EquipmentManagement/Ems00009GetProjectList',
                    data: { MaiOrderEquipmentID: Mt_ID, page: pagination.page, rows: pagination.rows },
                    success: function (data) {

                        success(data);
                        
                    }
                });
            },
            fn_saveData: function (saveData, success) {
                mf.ajax({
                    type: 'Post',
                    url: '/MES/api/EquipmentManagement/Ems00010ProjectSave',
                    data: JSON.stringify(saveData),
                    success: function (data) {
    
                        success(data);
                    }
                });
            },
            isRealDelete: true,
            fn_realDelete: function (rowData, success) {
                mf.ajax({
                    type: 'post',
                    url: '/MES/api/EquipmentManagement/Ems00009ProjectDelete',
                    data: JSON.stringify({ MaiOrderProjectID: rowData.MaiOrderProjectID }),
                    success: function (data) {
                        console.log(data)
                        if (data.status == "200") {
                            msg.success(fields.info, data.msg);
                            DetailTable.loadData();
                        }
                        else {
                            msg.error(fields.info, data.msg);
                        }
                    }
                })
            },
            fn_onEditingRowRandFinish: function ($row) {
                $row.eq(0).find("#AttributeValue").text()
                $row.eq(0).find("#AttributeName").text()
                $row.find("#AttributeValue")
    
                if (getCondition.substring(5, 18) == "0201213000096") {
                    $($row.eq(0).find("#AttributeValue")).html('<img src="/Content/img/yes.png"/>')
                }

            },
            fn_onRowClick: function (data) {
                //console.log(data)
                //var option = {};
                //option.yes = "1";
                //option.no = "0";
                //option.event = "keyup";
                //option.eventName = "model.checkNumber()";

                //getCondition = data.Attribute;
                //if (!data.Attribute) {
                //    data.Attribute = "100390201213000097"
                //    getCondition = "100390201213000097"
                //};

                //if (data.Attribute.substring(5, data.Attribute.length) == "0201213000096") {

                //    Randers.createEditingCell = function (field, fn_onChange) {

                //        var $checkbox = $('<input id="' + field + '" type="checkbox"/>');
                //        $checkbox.change(fn_onChange);
                //        return $checkbox;
                //    }
                //    Randers.getEditingCellValue = function ($checkbox) {
                //        return $checkbox.is(":checked") ? option.yes : option.no;
                //    }
                //    Randers.setEditingCellValue = function ($checkbox, value) {

                //        if (value == option.yes)
                //            $checkbox.prop("checked", true);
                //        else if (value == option.no)
                //            $checkbox.prop("checked", false);
                //        else {
                //            console.error("invaild SingleCheckBox value:" + value);
                //            return false;
                //        }
                //        return true;
                //    }



                //} else if (data.Attribute.substring(5, 18) == "0201213000095") {
                //    Randers.createEditingCell = function (field, fn_onChange) {
                //        var $text = $('<input id="' + field + '" type="text" class="search-input" style="margin-right:2px;"' + ' ' + 'on' + option.event + '="' + option.eventName + '"/>');
                //        $text.attr({ "size": "10" });
                //        $text.change(fn_onChange);
                //        return $text
                //    }
                //    Randers.getEditingCellValue = function ($text) {
                //        return $text.val();
                //    };

                //    Randers.setEditingCellValue = function ($text, value) {
                //        $text.val(value);
                //        return true;
                //    };
                //} else {

                //    Randers.createEditingCell = function (field, fn_onChange) {
                //        var $text = $('<input id="' + field + '" type="text" class="search-input" style="margin-right:2px;"/>');
                //        $text.attr({ "size": "10" });
                //        $text.change(fn_onChange);
                //        return $text
                //    };
                //    Randers.getEditingCellValue = function ($text) {
                //        return $text.val();
                //    };
                //    Randers.setEditingCellValue = function ($text, value) {
                //        $text.val(value);
                //        return true;
                //    }
                //}
                
                
            },
            LastWidth: "130",
            IsSetTableWidth: true,
            columns: [
                {
                    field: 'Sequence', title: fields.Sequence, align: "center", width: "100",
                    rander: new mf.WirteOnceOnlyRander(
                        new mf.TextRander({ title: true })
                        )
                },
                {
                    field: 'ProjectCode', title: fields.MaintenanceItem, align: "center", width: "140",
                    rander: new mf.WirteOnceOnlyRander(
                        new mf.TextRander({ title: true })
                        )
                },
                {
                    field: 'ProjectName', title: fields.ItemDirections, align: "center", width: "140",
                    rander: new mf.WirteOnceOnlyRander(
                        new mf.TextRander({ title: true })
                        )
                },
                {
                    field: 'AttributeName', title: fields.AttributeFlag, align: "center", width: "80",
                    rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ title: true }))
                },
                {
                    field: 'AttributeValue', title: fields.Attribute, align: "center", width: "130",
                    rander: new mf.MultipleRanderOne("Attribute", "", ["", "0201213000096"], {yes:"1", no:"0"},{title:true})
                        //Randers//new TextRander({title:true,event:keyup,evnetName:"model.checkNumber()"}),
                        
                },
                {
                    field: 'Comments', title: fields.Remark, align: "center", width: "180",
                    rander: new mf.StaticValueRander({title:true}),
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
                    rander: new mf.StaticValueRander(),

                },
                {
                    field: 'ModifiedTime', title: fields.LastChangedDate, align: "center",
                    rander: new mf.TextTimeRander()
                }
            ],
            fn_onEditingRowArgsCheck: function ($row, rowdata, isAdding) {
                var reg = /\D/g
                var inputValue = $($row.find('#AttributeValue')).val();
                if (rowdata.Attribute.substring(5, 18) == "0201213000094") {//字符

                } else if (rowdata.Attribute.substring(5, 18) == "0201213000095") {//数值
                    if (reg.test(inputValue) == true) {
                   
                        return fields.ActualValueIsNumber
                    }

                } else if (rowdata.Attribute.substring(5, 18) == "0201213000096") { //逻辑

                }
            }
        });
   // }

    //this.init = function (tableStr, paginationBarStr) {
    //    initTable(tableStr, paginationBarStr);
    //};


    //查詢
    this.searchClick = function () {

            MainTable.goForwordSafely(function () {
                MainTable.loadData(null, null, 1);
            }, null);
    }

    //刷新
    this.refreshClick = function () {
        DetailTable.goForword(function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        }, function () {
            window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
            window.location.reload();
        });
    };

    //导入
    this.importClick = function () {
        $("#ImportDialog").modal({ backdrop: 'static', keyboard: false });
        $("#ImportDialog").modal('show');


        $("#FileName").text(fields.PleaseSelectFile);
        $("#BtnFile").val("");

        $("#BtnFile").unbind();
        $("#BtnBrowse").unbind();
        $("#BtnImport").unbind();

        $("#BtnFile").change(function () {
            var fileName = $("#BtnFile").val();
            if (fileName && fileName.length > 0) {
                $("#FileName").text(fileName);
            }
            else {
                $("#FileName").text(fields.PleaseSelectFile);
            }
        });
        $("#BtnBrowse").click(function () {
            $("#BtnFile").click();
        });
        $("#BtnImport").click(function () {

            var formdata = new FormData();
            formdata.append("file", document.getElementById('BtnFile').files[0]);
            formdata.append("Token", token);

            $.ajax({
                type: 'POST',
                url: window.top.mf.domain + '/MES/api/ImportFile/Ems00010Import',
                data: formdata,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                success: function (ret) {
                    if (ret.status == "200") {
                        msg.success(fields.info, ret.msg, function () {
                            $('#ImportDialog').modal('hide');
                            MainTable.loadData();
                        });
                    }
                    else {
                        msg.error(fields.info, ret.msg);
                    }
                }
            });
        });
    };

    //导出
    this.exportClick = function () {

        var Status = GetChecked();
        var TypeCode = $("#MaintenanceType").val();
        var EquipmentCode = $("#MaintenanceEquipment").val();
        var UserCode = $("#MaintenanceUser").val();//formData.MaintenanceUserID();
        var StartCode = $("#StartMaintenanceNo").val();
        var EndCode = $("#EndMaintenanceNo").val();
        var StartDate = $("#StartMaintenanceDate").val();
        var EndDate = $("#EndMaintenanceDate").val();

        MainTable.loadDataBack(null,function () {

            if (ExportTotal == 0) {
                msg.info(fields.info, fields.NoDataExport);
                return;
            }

            var exportUrl = mf.domain + '/MES/api/ExportFile/Ems00010Export?Token=' + token;
            

            if (TypeCode && TypeCode.length > 0) {
                exportUrl = exportUrl + '&TypeCode=' + TypeCode;
            }

            if (EquipmentCode && EquipmentCode.length > 0) {
                exportUrl = exportUrl + '&EquipmentCode=' + EquipmentCode;
            }

            if (UserCode && UserCode.length > 0) {
                exportUrl = exportUrl + '&UserCode=' + UserCode;
            }

            if (StartCode && StartCode.length > 0) {
                exportUrl = exportUrl + '&StartCode=' + StartCode;
            }

            if (EndCode && EndCode.length > 0) {
                exportUrl = exportUrl + '&EndCode=' + EndCode;
            }

            if (StartDate && StartDate.length > 0) {
                exportUrl = exportUrl + '&StartDate=' + StartDate;
            }
            if (EndDate && EndDate.length > 0) {
                exportUrl = exportUrl + '&EndDate=' + EndDate;
            }
            if (Status && Status.length > 0) {
                exportUrl = exportUrl + '&Status=' + Status;
            }
            console.log(exportUrl)
            window.location.href = exportUrl;
        });
    };

    //新增明细
    this.addDetailClick = function () {
        var row = MainTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        }
        MaiOrderEquipmentID = row.MaiOrderEquipmentID
        AddEquipmentMaintenanceTable.loadData();
        $("#AddEquipmentMaintenanceDialog").modal({ backdrop: 'static', keyboard: false });
        $("#AddEquipmentMaintenanceDialog").modal('show');
    };

    //编辑明细
    this.editDetailClick = function () {
        var row = DetailTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        };
        DetailTable.editRow();
    };

    //删除明细
    this.deleteDetailClick = function () {
        var row = DetailTable.getSelectedData();
        if (!row) {
            msg.info(fields.Prompt, fields.PleaseSelectRecord);
            return;
        };
        DetailTable.deleteRow();
       
    };

    //保存明细
    this.saveDetailClick = function () {
        DetailTable.save(null, null, true);
    };

    //新增全选
    this.checkboxClick = function (obj) {
        var $tr = $(obj).parent().parent().parent().parent().parent().parent().parent();
        var $trCheckbox = $tr.find('input[class="mf-option"]:checkbox');
        if ($(obj).is(':checked')) {
            $trCheckbox.prop("checked", true);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().addClass("multiSelected");
            });
        }
        else {
            $trCheckbox.prop("checked", false);
            $trCheckbox.each(function () {
                $trCheckbox.parent().parent().removeClass("multiSelected");
            });
        }
    };

    //新增-确定
    $("#AddEquipmentMaintenanceDetailsBtn").click(function () {
        var $selectedRows = AddEquipmentMaintenanceTable.getMultiSelectedRows();

        var rowData = ""; var saveData = {};
        $selectedRows.each(function (i, $selectedRow) {
            rowData = AddEquipmentMaintenanceTable.getRowData($selectedRow);
           // console.log(rowData)
        });
      //  var row = DetailTable.getSelectedData();
        //  console.log(rowData)

        
        var selected = $('.mf-option:checked');
    
     //   saveData.rowDatas = rowData;
        //  saveData.MaiOrderEquipmentID = Mt_ID;
        var ParameterIDs = "";
        for (var i = 0; i < selected.length; i++) {
            var $CheckedTr = $(selected[i]).parent().parent();
            var row = AddEquipmentMaintenanceTable.getRowData($CheckedTr);
      
            var CheckedId = row.ParameterID;
            ParameterIDs = ParameterIDs + "," + CheckedId;
        }
        ParameterIDs = ParameterIDs.substring(1, ParameterIDs.length);
  /*
        var saveData = {};
        saveData.MaintenanceNo = '';
        saveData.Date = "";
        saveData.MaintenanceDate = "";
        saveData.Type = "";
        saveData.EquipmentMaintenanceListID = "";
        saveData.OrganizationID = "";
        saveData.ManufacturerID = "";
        saveData.MESUserID = "";
        saveData.Status = "";
        saveData.Comments = "";
*/
        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/Ems00009ProjectAdd',
            data: JSON.stringify({ Projects: ParameterIDs, MaiOrderEquipmentID: Mt_ID }),
            success: function (data) {
            
                if (data.status === "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        $('#AddEquipmentMaintenanceDialog').modal('hide');
                        DetailTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
                
            }
        });
    });

    //开始保养按钮事件
    this.StartMaintenanceClick = function (obj,isNo) {
        var $tr = $(obj).parent().parent();
        var rowData = MainTable.getRowData($tr);

        var saveData = {};
        saveData.MaiOrderEquipmentID = rowData.MaiOrderEquipmentID;

        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/Ems00010Start',
            data: JSON.stringify(saveData),
            success: function (data) {
                
                if (data.status === "200") {
                    msg.success(fields.Prompt, data.msg, function () {
                        $('#AddEquipmentMaintenanceDialog').modal('hide');
                        DetailTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            
            }
        });
    }

    //结束保养按钮事件
    this.EndMaintenanceClick = function (obj) {
        var $tr = $(obj).parent().parent();
        var rowData = MainTable.getRowData($tr);
        var saveData = {};
        saveData.MaiOrderEquipmentID = rowData.MaiOrderEquipmentID;

        mf.ajax({
            type: 'Post',
            url: '/MES/api/EquipmentManagement/Ems00010End',
            data: JSON.stringify(saveData),
            success: function (data) {
             
                if (data.status === "200") {
              
                    msg.success(fields.Prompt, data.msg, function () {
                        $('#AddEquipmentMaintenanceDialog').modal('hide');
                        DetailTable.loadData();
                    });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
                
            }
        });
    }
   
    //保养类型开窗资料
    var CategoryCodeTable = new mf.Table("#CategoryCodeTable", {
        uniqueId: "ParameterID",
        editable: false,
        paginationBar: new mf.PaginationBar("#CategoryCodePageBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var SearchCode = formData.searchCategoryCode();
            if (SearchCode && SearchCode.length > 0) {
                searchData.Code = SearchCode + "";
            }
            searchData.typeID = '000023'
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/getParameterList',
                data: searchData,
                success: function (data) {
                   //   console.log(data)
                      success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.CategoryCode, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.CategoryDec, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //保养类型开窗查询
    $("#searchCategoryCodeClick").click(function () {
        CategoryCodeTable.goForwordSafely(function () {
            CategoryCodeTable.loadData(null, null, 1);
        }, null);
    });

    //保养类型开窗
    this.SearchCategoryCode = function () {
        $("#AddMaintenanceTypeDialog").modal("show");
        $("#AddMaintenanceTypeDialog").modal({ backdrop: 'static', keyboard: false });
        CategoryCodeTable.loadData();

        $("#CategoryCodeComfirmClick").unbind();
        $("#CategoryCodeComfirmClick").click(function () {
            var row = CategoryCodeTable.getSelectedData();
            if (row) {
                $("#MaintenanceType").val(row.Code);
                $("#AddMaintenanceTypeDialog").modal("hide");
                $("#CategoryCode").val("");
                formData.searchCategoryCode = ko.observable();
            }
        });
    }

    //保养设备开窗资料
    var EquipmentMasterTable = new mf.Table("#EquipmentMasterTable", {
        uniqueId: "EquipmentID",
        editable: false,
        paginationBar: new mf.PaginationBar("#EquipmentMasterPageBar"),
        fn_getData: function (pagination, searchData, success) {

            if (!searchData)
                searchData = {};

            var SearchCode = formData.searchEquipmentCode();
            if (SearchCode && SearchCode.length > 0) {
                searchData.Code = SearchCode + "";
            }

     
            searchData.page = pagination.page;
            searchData.rows = pagination.rows;

            mf.ajax({
                type: 'Get',
                url: '/MES/api/PopUp/GetEquipmentList',
                data: searchData,
                success: function (data) {
                      success(data);
                }
            });
        },
        fn_saveData: function (saveData, success) {
        },
        focusField: "Code",
        height: 300,
        columns: [
            {
                field: 'Code', title: fields.EquipmentCode, align: "center", width: "160",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            },
            {
                field: 'Name', title: fields.EquipmentDescription, align: "center", width: "100",
                rander: new mf.WirteOnceOnlyRander(new mf.TextRander({ size: 20, maxLength: 120, title: "title" })),
            }
        ]
    });

    //保养设备开窗查询
    $("#searchEquipmentCodeClick").click(function () {
        EquipmentMasterTable.goForwordSafely(function () {
            EquipmentMasterTable.loadData(null, null, 1);
        }, null);
    });

    //保养设备开窗
    this.SearchEquipmentMaster = function () {
        $("#SearchEquipmentMasterFileDialog").modal("show");
        $("#SearchEquipmentMasterFileDialog").modal({ backdrop: 'static', keyboard: false });
        EquipmentMasterTable.loadData();

        $("#EquipmentMasterComfirmClick").unbind();
        $("#EquipmentMasterComfirmClick").click(function () {
            var row = EquipmentMasterTable.getSelectedData();
            if (row) {
                $("#MaintenanceEquipment").val(row.Code);
                $("#SearchEquipmentMasterFileDialog").modal("hide");
                $("#EquipmentCode").val("");

                formData.searchEquipmentCode = ko.observable();
            }
        });
    }



    //清除数据
    this.clearInput = function (ID, IDS) {
        $(ID).val("");
        if (IDS != null) {
            $(IDS).val("");
        }

    };
};

var arrayWord = [
    "Remark", "Status", "CreatedBy", "CreatedDate", "LastChangedBy", "LastChangedDate",
    "Import", "Cancel", "Browse", "Comfirm", "Close", "Search", "Normal", "Invalid", "Prompt",
    "NoDataCanBeExported", "PleaseSelectRecord", "PleaseSaveDataFirst", "PleaseSelectFile",
    "New", "MaintenanceType", "DocumentStatus", "Issued", "Closed", "MaintenanceEquipment",
    "MaintenanceUser", "StartMaintenanceNo", "StartMaintenance", "EndMaintenance", "MaintenDate",
    "TypeDesc", "MtNo", "SequenceNo", "EquipmentCode", "EquipmentName", "ResponsibleWorkNumber",
    "Name", "MaintenanceDepartment", "MaintenanceSupplier", "MaintenanceDept", "Model", "SerialNo",
    "FixedAssets", "ExpireDate", "MaintenanceItem", "ItemDirections", "AttributeFlag", "Attribute",
    "EndMaintenanceNo", "StartMaintenanceDate", "EndMaintenanceDate", "Sequence", "AddEquipmentMaintenanceDetails",
    "PleaseSelectRecord", "EquipmentMasterFile", "EquipmentDescription", "AccountMaster", "WorkNumber", "Prompt", "ThereOnlyInputNumber",
    "CategoryCode", "CategoryDec", "AccountWorkNumber", "NoDataExport", "info", "PleaseSelectFile", "ActualValueIsNumber"
];
words = arrayWord.join();
var URL = "/MES/EquipmentManagement/EMS00010";
var MID = window.top.page_parameters.GetParameters(URL);
mf.toolBar('#container');
$(".i-checks").iCheck({ checkboxClass: "icheckbox_square-blue", radioClass: "iradio_square-blue" });
var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    
    //window.addEventListener('DOMContentLoaded', function () {
    //    document.body.addEventListener('click', gj_AccountProtect.bindTEXT);
    //});

    model = new viewModel();
   // model.init("#DetailTable", "#paginagionDetailBar");

};