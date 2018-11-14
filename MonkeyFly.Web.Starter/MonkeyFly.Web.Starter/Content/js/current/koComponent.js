/*
 * koComponent.js
 * @author Tom
 */

mf.koComponent = {};

mf.koComponent.MultiCheckbox = function(name, value, isCheck) {
    this.name = name;
    this.value = value;
    this.isCheck = isCheck;
};

ko.components.register('multi-checkbox', {
    viewModel: function (params) {
        this.checkboxs = params.checkboxs;
    },
    template: '<span  data-bind="foreach: checkboxs" >' +
                    '<input type="checkbox" class="multi-checkbox" data-bind="checked: isCheck" >' +
                    '<span data-bind="text: name"></span>' +
              '</span>'
});