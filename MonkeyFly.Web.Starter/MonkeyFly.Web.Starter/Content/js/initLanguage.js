/// <reference path="../../Data/lang-en.js" />
/**
 * @param {String} lang = ['cn' | 'en' | 'tw']
 */
var changeLanguage = function (lang) {
    lang = lang || 'cn';
    sessionStorage.setItem('lang', lang);
    var prefix = 'lang-',
		suffix = '.js';
    $.ajax({
        //url: api.data + prefix + lang + suffix,
        url:'/Data/lang-tw.js',
        dataType: 'json',
        success: function (data) {
            alert(JSON.stringify(data));
            $('[data-meaning]').each(function (i, elem) {
                var $elem = $(elem),
					value = data[$elem.attr('data-meaning')];
                if (value) $elem.text(value);
            });
        },
        error: function () {
            changeLanguage('tw');
        }
    });
};
var initLanguage = function () {
    changeLanguage(sessionStorage.getItem('lang'));
};
var api = {
    data: '/Data/',
    img: '/Content/images/'
}
