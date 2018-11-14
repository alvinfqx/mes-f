var viewModel = function () {
    var self = this;
    this.form = {
        languageId: ko.observable(),
        companyId: ko.observable(),
        company: ko.observable(),
        ribbonId: ko.observable(),
        username: ko.observable(),
        password: ko.observable(),
        language: ko.observable(),
        ip: ko.observable(),
        city: null
    };
    this.passwordLook = ko.observable();
    this.message = ko.observable();
    this.languages = ko.observableArray([
        { value: "en", text: "English" },
        { value: "zh-cn", text: "简体中文" },
        { value: "zh-tw", text: "繁體中文" }
    ]);
    this.company = ko.observableArray([]);
    this.ribbon = ko.observableArray([]);

    this.loginStatus = true;

    this.loginClick = function () {
        
        if (self.form.companyId().length > 0) {
            self.message(tips.company);
            return;
        }

        if (!self.form.username()) {
            self.message(tips.username);
            return;
        }

        if (!self.passwordLook()) {
            self.message(tips.password);
            return;
        }

        if (!self.form.ribbonId()) {
            self.message(tips.ribbon);
            return;
        }

        var code = $('#code').val();
        if ($('#ehong-code-input').val().toLowerCase() != code.toLowerCase()) {
            self.message(tips.code);
            return;
        }

        var clientIP = returnCitySN && returnCitySN.cip ? returnCitySN.cip : "Unkown";
        self.form.ip(clientIP);
        self.form.password(hex_md5(self.passwordLook()));
        self.form.company("100360321213000000");
        
        if (self.loginStatus) {

            if (elem.checked) {
                sessionStorage.setItem("account", model.form.username());
            }
            else {
                sessionStorage.removeItem("account");
            }

            switch (self.form.languageId()) {
                case "zh-cn":
                    self.form.language(1);
                    break;
                case "zh-tw":
                    self.form.language(2);
                    break;
                case "en":
                    self.form.language(3);
                    break;
            }

            $.ajax({
                type: "POST",
                url: "https://202api.monkeyfly.net/MES/api/Auth/Login",
                data: ko.toJSON(self.form),
                dataType: "json",
                contentType: "application/json",
                success: function (d) {
                    loginStatus = true;
                    if (d.status == '200') {
                        self.message(tips.login_success);
                        //document.cookie = "token=" + d.Token + ";";
                        //document.cookie = "username=" + self.form.username() + ";";

                        sessionStorage.setItem("token", d.Token);
                        sessionStorage.setItem("username", self.form.username());

                        window.location.href = '/Home';
                    } else {
                        self.passwordLook("");
                        self.message(tips.login_fail);
                    }
                },
                beforeSend: function () {
                    loginStatus = false;
                    self.message(tips.before);
                }
            });
        }
    }


    //按回车键触发
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            self.loginClick();
        }
    };
};