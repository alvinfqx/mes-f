var viewModel = function () {

    var self = this;
    var table = null, Namearry = [], Deptarry = [];

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/Util/GetParameters",
        data: { "typeIDs": "0191213000051" },
        success: function (data) {
            var Listdata = data.PT0191213000051;
            for (var i = 0; i < Listdata.length; i++) {
                Namearry[i] = { value: Listdata[i].value, text: Listdata[i].text }
            }
        }
    });

    mf.ajax({
        type: 'Get',
        async: false,
        url: "/MES/api/IntelligentParameter/Inf00003GetOrganization",
        success: function (data) {
            //alert(JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                Deptarry[i] = { value: data[i].OrganizationID, text: data[i].NewName }
            }
        }
    });

    $('#Brith').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    $('#InTime').datepicker({
        language: language,
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayBtn: "linked"
    });

    var formModel = {
        Brith: ko.observable(),
        Account: ko.observable(),
        Emplno: ko.observable(),
        UserName: ko.observable(),
        EnglishName: ko.observable(),
        Sex: ko.observable(),
        IDcard: ko.observable(),
        Mobile: ko.observable(),
        Email: ko.observable(),
        Type: ko.observable(),
        CardCode: ko.observable(),
        InTime: ko.observable(),
        Comments: ko.observable(),
        Status: ko.observable(),
        Department: ko.observable(),
        SexArray: ko.observableArray(),
        StatusArray: ko.observableArray(),
        TypeArray: ko.observableArray(),
        DepartmentArray: ko.observableArray(),
        PleaseChoose: ko.observable()
    };
    ko.applyBindings(formModel);

    formModel.StatusArray([{ value: 1, text: fields.Normal }, { value: 0, text: fields.Invalid }]);
    formModel.SexArray([{ value: 1, text: fields.Male }, { value: 0, text: fields.Female }]);
    formModel.TypeArray(Namearry);
    formModel.PleaseChoose(fields.PleaseChoose);
    formModel.DepartmentArray(Deptarry);

    if (!parameters.tableID) {
        var row = parameters.row;
        formModel.Account(row.Account);
        formModel.Emplno(row.Emplno);
        formModel.UserName(row.UserName);
        formModel.EnglishName(row.EnglishName);
        formModel.Sex(row.Sex);
        formModel.IDcard(row.IDcard);
        formModel.Mobile(row.Mobile);
        formModel.Email(row.Email);
        formModel.Type(row.Type);
        formModel.CardCode(row.CardCode);
        formModel.InTime(row.InTime);
        formModel.Comments(row.Comments);
        formModel.Brith(row.Brith);
        formModel.Department(row.OrganizationID);
    }

    this.saveClick = function () {

        if (!formModel.Account()) {
            msg.info(fields.info, fields.AccountIsNull);
            return;
        }

        else if (!formModel.UserName()) {
            msg.info(fields.info, fields.UserNameIsNull);
            return;
        }

        else if (formModel.IDcard() && !/^([0-9a-zA-Z]{1,18})$/.test(formModel.IDcard())) {
            msg.info(fields.info, fields.IDcardIsTrue);
            return;
        }

        else if (formModel.Mobile() && !/^([0-9]{1,11})$/.test(formModel.Mobile())) {
            msg.info(fields.info, fields.MobileIsTrue);
            return;
        }

        else if (formModel.Email() && !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(formModel.Email())) {
            msg.info(fields.info, fields.EmailIsTrue);
            return;
        }

        var saveData = {
            Account: formModel.Account(),
            Emplno: formModel.Emplno(),
            UserName: formModel.UserName(),
            EnglishName: formModel.EnglishName(),
            Sex: formModel.Sex(),
            IDcard: formModel.IDcard(),
            Mobile: formModel.Mobile(),
            Email: formModel.Email(),
            Type: formModel.Type(),
            CardCode: formModel.CardCode(),
            InTime: formModel.InTime(),
            Comments: formModel.Comments(),
            Status: formModel.Status(),
            Brith: formModel.Brith(),
            OrganizationID: formModel.Department()
        }

        if (parameters.tableID) {
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00003Add',
                data: JSON.stringify(saveData),
                success: function (data) {
                    if (data.status == "200") {
                        msg.success(fields.info, data.msg, function () {
                            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
                            window.location.href = parameters.parentUrl;
                        });
                    }
                    else {
                        msg.error(fields.info, data.msg);
                    }
                }
            });
        }
        else {
            saveData.MESUserID = row.MESUserID;
            mf.ajax({
                type: 'Post',
                url: '/MES/api/IntelligentParameter/Inf00003Update',
                data: JSON.stringify(saveData),
                beforeSend: function () {
                    // 禁用按钮防止重复提交
                    $("#btn_Save").attr("disabled", true);
                },
                success: function (data) {
                    if (data.status == "200") {
                        msg.success(fields.info, data.msg, function () {
                            window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
                            window.location.href = parameters.parentUrl;
                        });
                    }
                    else {
                        msg.error(fields.info, data.msg);
                    }
                },
                complete: function () {
                    $("#btn_Save").removeAttr("disabled");
                }
            });
        }


    };

    //返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: parameters.parentUrl, Parameters: parameters.parentMID });
        window.location.href = parameters.parentUrl;
    };

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: "/MES/IntelligentParameters/INF00003Edit", Parameters: parameters });
        window.location.reload();
    };
}

var parameters = window.top.page_parameters.GetParameters("/MES/IntelligentParameters/INF00003Edit");

var arrayWord = [
    "EditEmployee", "Cancel", "Refresh", "Save", "Birthday", "WorkNumber", "Name", "EnglishName",
    "Sex", "IDcard", "Phone", "Birthday", "Email", "Status", "JobType", "EntryTime", "CardNumber",
    "Remark", "AccountNo", "Normal", "Invalid", "Male", "Female", "info", "NoDataExport", "AccountIsNull",
    "UserNameIsNull", "EmplnoIsNull", "IDcardIsNull", "MobileIsNull", "InTimeIsNull", "MobileIsTrue",
    "EmailIsTrue", "IDcardIsTrue", "CardCodeIsNull", "IsEdit", "Department", "PleaseChoose"
];

words = arrayWord.join();

var model = null;

//初始页面数据，包括获取语系数据等
initPage = function () {
    model = new viewModel();
    console.log(fields.Normal);
};