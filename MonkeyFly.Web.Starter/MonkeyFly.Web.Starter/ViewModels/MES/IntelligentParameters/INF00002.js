var URL = "/MES/IntelligentParameters/INF00002";
var MID = window.top.page_parameters.GetParameters(URL);
var model = null;
var parameters = null;
var viewModel = function () {
    var self = this;
    this.form = {
        MESUserID: ko.observable(),
        Account: ko.observable(),
        Emplno: ko.observable(),
        UserName: ko.observable(),
        JobTitle: ko.observable(),
        EnglishName: ko.observable(),
        OrganizationCode: ko.observable(),
        OrganizationName: ko.observable(),
        Email: ko.observable(),
        CardCode: ko.observable(),
        Status: ko.observable(),
        Comments: ko.observable(),
        Langwage: ko.observable(),
        LangwageList: ko.observableArray()
    };
    ko.applyBindings(self.form);

    //查询数据
    this.getUserData = function () {
        mf.ajax({
            type: 'get',
            url: '/MES/api/IntelligentParameter/Inf00002GetUser',
            success: function (data) {
                if (data) {
                    self.form.MESUserID(data.MESUserID);
                    self.form.Account(data.Account);
                    self.form.Emplno(data.Emplno);
                    self.form.UserName(data.UserName);
                    self.form.JobTitle(data.JobTitle);
                    self.form.EnglishName(data.EnglishName);
                    self.form.OrganizationCode(data.OrganizationCode);
                    self.form.OrganizationName(data.OrganizationName);
                    self.form.Email(data.Email);
                    self.form.CardCode(data.CardCode);
                    self.form.Status(data.StatusName == 1 ? fields.Normal : fields.Invalid);
                    self.form.Comments(data.Comments);
                    self.form.Langwage(data.Language);
                }
            }
        });
    };

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.reload();
    };

    //保存
    this.saveClick = function () {

        if (self.form.Email() && !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(self.form.Email())) {
            msg.info(fields.Prompt, fields.EmailIsTrue);
            return;
        }

        $("#btn_save").attr("disabled", true);
        mf.ajax({
            type: 'Post',
            url: '/MES/api/IntelligentParameter/Inf00002UserSave',
            data: JSON.stringify({
                MESUserID: self.form.MESUserID(),
                EnglishName: self.form.EnglishName(),
                Email: self.form.Email(),
                Language: self.form.Langwage()
            }),
            success: function (data) {
                $("#btn_save").attr("disabled", false);
                if (data.status == "200") {
                    msg.success(
                        fields.Prompt, data.msg,
                        function () {
                            self.getUserData();
                        });
                }
                else {
                    msg.error(fields.Prompt, data.msg);
                }
            }
        });
    };

    //变更密码
    this.updatePasswordClick = function () {
        window.top.changePassword && window.top.changePassword();
    };

    //密码还原
    this.passwordClick = function () {
        msg.warning(fields.Prompt, fields.ResetPassword, function () {
            mf.ajax({
                type: 'Get',
                url: '/MES/api/user/PostResetPassword',
                data: ({ ID: self.form.MESUserID() }),
                success: function (data) {
                    if (data.status == 200) {
                        msg.success(fields.Prompt, fields.ResetPasswordSuccess);
                        window.top.logout && window.top.logout();
                    }
                    else {
                        msg.error(fields.Prompt, data.msg);
                    }
                }
            });
        });
    };
};
var arrayWord = [
    "Prompt", "ResetPassword", "ResetPasswordSuccess", "AccountNo", "WorkNumber", "Name", "EnglishName",
    "DepartmentNo", "DepartmentDescription", "JobTitle", "Email", "CardNumber", "Status", "Remark",
    "Langwage", "EmailIsTrue", "Normal", "Invalid"
];

words = arrayWord.join();
mf.toolBar('#container');
initPage = function () {
    mf.ajax({
        type: 'Get',
        url: "/MES/api/IntelligentParameter/GetLanguageList",
        data: ({ page: 1, rows: 10000 }),
        success: function (data) {
            var LanguagesCodeList = [];
            for (var i = 0; i < data.rows.length; i++) {
                LanguagesCodeList[i] = { value: data.rows[i].Code, text: data.rows[i].Code + "-" + data.rows[i].Name };
            }
            model = new viewModel();
            model.form.LangwageList(LanguagesCodeList);
            model.getUserData();
        }
    });
};