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
    }

}
export default API
