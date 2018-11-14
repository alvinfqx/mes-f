var page_parameters = {
    MenuData: [],
    GetURL: function (MID) {

        for (var i = 0; i < this.MenuData.length; i++) {

            if (this.MenuData[i].MenuID == MID) {

                return this.MenuData[i].URL + '?MID=' + this.MenuData[i].MenuID;
            }
        }

        return '#';
    },

    GetMID: function (URL) {

        for (var i = 0; i < this.MenuData.length; i++) {

            if (this.MenuData[i].URL == URL) {

                return this.MenuData[i].MenuID;
            }
        }

        return '#';
    },

    Caching: [],
    GetParameters: function (URL) {
        var temp;
        for (var i = 0; i < this.Caching.length; i++) {

            if (this.Caching[i].URL == URL) {
                temp = this.Caching[i].Parameters;
                this.Caching.splice(i, 1);//删除索引i下的元素
                break;
            }
        }

        return temp;
    }
};
