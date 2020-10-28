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
        that.newsInfo = getNewsList(that.searchinput, 0, 10);
    } else {
        that.searchinput = "";
        that.newsInfo["keywords"] = [];
        that.currentClass = Number(that.$route.query.query) - 1;
        that.newsInfo["data"] = getNewsClassList(that.currentClass, 0, 10);
    }
}

export{ searchResult }
