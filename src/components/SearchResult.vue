<template>
<div class="result">
    <el-container>
        <el-header>
            <NavBar v-bind:isSearch="String(isSearch)" :username = "userstate.username" @user-logout = "userLogout"> </NavBar>
        </el-header>

        <div class="search-box">
            <SearchBox ref="searchbox" @update-news="updateNews" @text-change="updateInput" v-bind:username = "userstate.username" :searchInputProp="searchinput">
            </SearchBox>
        </div>
        <div class="info" v-if="isSearch==='true'">
            <p>
                查询到 {{ newsInfo["total"] }}条结果, 用时{{ newsInfo["time"]}}s
            </p>
        </div>

        <el-row :gutter="20">
            <el-col :span="12" :offset="3">
                <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                <NewsList v-bind:username = "userstate.username" v-if="!isLoading" v-bind:newsList="newsInfo['data']" :keywords="newsInfo['keywords']">
                </NewsList>
            </el-col>
            <el-col :span="6">
                <HotList v-bind:hotList="hotList"> </HotList>
            </el-col>
        </el-row>

        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="newsInfo['total']" @current-change="handleCurrentChange" :current-page.sync="currentPage">
            </el-pagination>
        </div>
    </el-container>
</div>
</template>

<script>
//import { highlightKeyWords } from "../utils/highlight.js";
import SearchBox from "./SearchBox.vue";
import NewsList from "./NewsList.vue";
import HotList from "./HotList.vue";
import NavBar from "./NavBar.vue";
import load from "../assets/loading.gif"
import {
    getNewsList,
    getNewsClassList
} from "../datas/newslist.js";

import {
    searchResult
} from "@/utils/communication"

export default {
    name: "SearchResult",
    components: {
        SearchBox,
        NewsList,
        HotList,
        NavBar,
    },
    inject: ['reload'],
    props: {
        loadgif: {
            type: String,
            default: () => load,
        },
    },
    data() {
        return {
            //用户状态记录
            userstate:{
                username:this.$cookies.get("username")?this.$cookies.get("username"):""
            },
            newsInfo: {
                data: [],
                time: 0.0001,
                total: 1000,
                keywords: [],
            },
            hotList: new Array(10).fill({
                uid: 0,
                link: "https://www.baidu.com",
                title: "This is a hot news news" + 0,
                hot: "100万",
            }),
            currentPage: 1,
            searchinput: "",
            currentClass: 0,
            isSearch: true,
            isLoading: false,
        };
    },
    methods: {
        userLogout(){
            this.$cookies.remove("username")
            this.userstate.username = ""
        },
        updateNews(newsInfo) {
            console.log("updateNews")
            console.log(newsInfo)
            this.newsInfo = newsInfo;
            this.currentPage = 1;
        },
        handleCurrentChange() {
            console.log("input in result ", this.searchinput, this.isSearch);
            if (!this.isSearch || this.isSearch === "false") {
                getNewsClassList(this.currentClass, this.currentPage - 1, 10, this)
            } else {
                getNewsList(this.searchinput, this.currentPage - 1, 10, this)
            }
            console.log(this.isLoading)
            this.backTop()
        },
        updateInput(searchinput) {
            this.searchinput = searchinput;
            this.isSearch = true;
        },
        backTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
    },
    created() {
        console.log("created: ", this.$route.query);
        searchResult(this);
    },
    mounted() {},
    watch: {
        $route() {
            console.log(this.isLoading)
            console.log("changed: ", this.$route.query);
            searchResult(this);
            console.log(this.isLoading)
            //this.isLoading = true
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.info {
    position: relateive;
    margin-left: 21%;
    color: #909399;
    font-size: 9px;
}

.pagination {
    position: relateive;
    margin-left: 14%;
    margin-top: 1%;
    margin-bottom: 5%;
    color: #909399;
}

mark {
    background: orange;
    color: red;
}

.highlight-text {
    background: transparent;
    color: red;
}

img {
    position: relative;
    margin-right: auto;
    margin-left: auto;
    margin-top: 18%;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    align-items: center;
}
</style>
