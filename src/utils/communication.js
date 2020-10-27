
function urlParam(url, key, value) {
    url += (url.indexOf('?') == -1 ) ? '?' : '&' ; 
    url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
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

export{
    searchResult,
    urlParam
 }