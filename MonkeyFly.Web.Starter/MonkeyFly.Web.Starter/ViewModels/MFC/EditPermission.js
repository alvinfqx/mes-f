var viewModel = function () {
    var self = this;

    //返回
    this.backClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.href = URL;
    };

    //刷新
    this.refreshClick = function () {
        window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
        window.location.href = '/Role/EditPermission?ID=' + ID + '&Name=' + Name;
    };

    //保存
    this.saveClick = function () {

        var selectedMenus = $('#menuTable').bootstrapTable('getSelections');
        var selectedButtons = $('input[name="buttons"]:checkbox:checked');
        var selectedActions = $('input[name="actions"]:checkbox:checked');

        var menus = [];
        var buttons = [];
        var actions = [];

        for (var i = 0; i < selectedMenus.length; i++) {
            menus.push({ MenuCode: selectedMenus[i].MenuCode });
        }

        for (var i = 0; i < selectedButtons.length; i++) {
            buttons.push({ MenuCode: $(selectedButtons[i]).val().split('_')[0], ButtonCode: $(selectedButtons[i]).val().split('_')[1] });
        }

        for (var i = 0; i < selectedActions.length; i++) {
            actions.push({ MenuCode: $(selectedActions[i]).val().split('_')[0], ActionCode: $(selectedActions[i]).val().split('_')[1] });
        }

        mf.ajax({
            type: 'post',
            url: '/MES/api/Role/EditPermission',
            data: JSON.stringify({ id: ID, menus: menus, buttons: buttons, actions: actions }),
            success: function (d) {
                msg.success("提示", d.msg);

                if (d.status == "200") {
                    window.top.page_parameters.Caching.push({ URL: URL, Parameters: MID });
                    window.location.href = '/Role/EditPermission?ID=' + ID + '&Name=' + Name;
                }
            }
        });
    };
};

var URL = '/Role';
var MID = window.top.page_parameters.GetParameters(URL);

var Permissions = [];
var BtnCols = [];
var AtnCols = [];

var formatterButtonChecked = function (ButtonID) {

    return function (value, row, index) {

        switch (value) {
            case 1:
                return '<label class="checkbox-inline i-checks"><input type="checkbox" name="buttons" value="' + row.MenuCode + '_' + ButtonID + '" checked="checked"></label>';
            case 0:
                return '<label class="checkbox-inline i-checks"><input type="checkbox" name="buttons" value="' + row.MenuCode + '_' + ButtonID + '"></label>';
            case -1:
                return '';
        }
    }
};

var formatterActionChecked = function (ActionID) {

    return function (value, row, index) {

        switch (value) {
            case 1:
                return '<label class="checkbox-inline i-checks"><input type="checkbox" name="actions" value="' + row.MenuCode + '_' + ActionID + '" checked="checked"></label>';
            case 0:
                return '<label class="checkbox-inline i-checks"><input type="checkbox" name="actions" value="' + row.MenuCode + '_' + ActionID + '"></label>';
            case -1:
                return '';
        }
    };
};

mf.ajax({
    type: 'Get',
    url: '/MES/api/Menu/GetButtons',
    async: false,
    success: function (d) {
        BtnCols.push({ field: 'MenuName', title: '菜单名称', halign: 'center', width: '400px' });

        for (var i = 0; i < d.length; i++) {
            BtnCols.push({ field: 'btn_' + d[i].ButtonID, title: d[i].Name, halign: 'center', align: 'center', formatter: formatterButtonChecked(d[i].ButtonID) });
        }
    }
});

mf.ajax({
    type: 'Get',
    url: '/MES/api/Menu/GetActions',
    async: false,
    success: function (d) {
        AtnCols.push({ field: 'MenuName', title: '菜单名称', halign: 'center', width: '300px' });

        for (var i = 0; i < d.length; i++) {
            AtnCols.push({ field: 'Act_' + d[i].ActionID, title: d[i].Name, halign: 'center', align: 'center', formatter: formatterActionChecked(d[i].ActionID) });
        }
    }
});

function setTables() {
    //$('#actionTable').bootstrapTable('destroy');
    //$('#buttonTable').bootstrapTable('destroy');

    Permissions = $('#menuTable').bootstrapTable('getSelections');

    $('#buttonTable').bootstrapTable('load', Permissions);

    $('#actionTable').bootstrapTable('load', Permissions);
}

mf.ajax({
    type: 'get',
    url: '/MES/api/Role/GetEnabled/' + ID,
    async: false,
    success: function (d) {

        $('#buttonTable').bootstrapTable({
            data: Permissions,
            columns: BtnCols,
            uniqueId: 'MenuCode',
            clickToSelect: true,
            height: window.innerHeight - 105
        });

        $('#actionTable').bootstrapTable({
            data: Permissions,
            columns: AtnCols,
            uniqueId: 'MenuCode',
            clickToSelect: true,
            height: window.innerHeight - 95
        });

        $('#menuTable').bootstrapTable({
            data: d,
            columns: [
                { field: 'State', title: '全选', checkbox: true, clickToSelect: true },
                { field: 'MenuName', title: '菜单名称', halign: 'center' },
                { field: 'Comments', title: '描述', halign: 'center' }
            ],
            uniqueId: 'MenuCode',
            clickToSelect: true,
            height: window.innerHeight - 105,
            onCheck: function (row) {
                setTables();
            },
            onUncheck: function (row) {
                setTables();
            },
            onCheckAll: function (rows) {
                setTables();
            },
            onUncheckAll: function (rows) {
                setTables();
            }
        });

        for (var i = 0; i < d.length; i++) {
            if (d[i].checked) {
                $('#menuTable').bootstrapTable('check', i);
            }
        }
    }
});

var model = new viewModel();