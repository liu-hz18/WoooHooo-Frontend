
function urlParam(url, key, value) {
    url += (url.indexOf('?') == -1 ) ? '?' : '&' ; 
    url += encodeURIComponent(key) + "=" + encodeURIComponent(value);
    return url;
}

export{
    urlParam
 }