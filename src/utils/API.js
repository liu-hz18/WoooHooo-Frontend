const API = {
    GET_NEWS_LIST: {
        path: "/api/search",
        method: "get",
    },
    POST_NEWS_LIST: {
        path: "/api/search",
        method: "post",
    },
    CHECK_USER_INFO: {
        path: "/api/login",
        method: "get",
    },
    UPDATE_USER_INFO: {
        path: "/api/login",
        method: "post",
    },
    SEND_USER_EMAIL: {
        path: "/api/validate",
        method : "post",
    },
    POST_USER_CLICK:{
        path: "/api/browsehis",
        method : "post",
    },
    GET_BROWSE:{
        path:"/api/browsehis",
        method:"get",
    },
    POST_USER_SEARCH:{
        path: "/api/searchhis",
        method : "post",
    },
    GET_RECOMMEND:{
        path:"/api/recommend",
        method:"get",
    },
    GET_USERINFO:{
        path:"/api/user",
        method:"get",
    },
    GET_HOT_LIST: {
        path: "/api/hot",
        method: "get",
    },
    GET_HOT_SEARCH_LIST: {
        path: "/api/hotsearch",
        method: "get",
    },
    RST_PASS:{
        path:"/api/update",
        method:"post",
    }
}
export default API
