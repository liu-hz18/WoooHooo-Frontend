import {
    getNewsList,
    getNewsClassList
} from "../datas/newslist.js";

export function urlParam(baseurl, params) {
    var url = baseurl
    var i = 0
    url += '?'
    console.log('urlParam')
    for (var key in params) {
        if (i > 0) {
            url += '&';
        }
        i += 1
        url += encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    }
    console.log(url)
    return url;
}

function searchResult(that){
    if ("{}" === JSON.stringify(that.$route.query)) {
        that.$router.push({
            name: "Home"
        });
    }
    that.isSearch = String(that.$route.query.issearch);
    if (that.isSearch === "true") {
        that.searchinput = that.$route.query.query;
        getNewsList(that.searchinput, 0, 10, that);
    } else {
        that.searchinput = "";
        that.currentClass = Number(that.$route.query.query);
        getNewsClassList(that.currentClass, 0, 10, that);
    }
}



export{ searchResult }
