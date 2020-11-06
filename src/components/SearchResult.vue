<template>
<div class="result">
    <el-container>
        <el-header>
            <NavBar v-bind:activeIndexProp="activeIndexProp" :isSearch="String(isSearch)" :username="userstate.username" @user-logout="userLogout" @choose-type="clearInput"> </NavBar>
        </el-header>
        <el-row style="margin-top: 0px; height: 90px;">
            <el-col :span="2" :offset="2">
                <img class="home-img" v-bind:src="homeicon" alt="WoooHooo~" />
            </el-col>
            <el-col :span="20">
                <div class="search-box">
                    <SearchBox ref="searchbox" @update-news="updateNews" @text-change="updateInput" v-bind:username="userstate.username" :searchinputProp="searchinput">
                    </SearchBox>
                </div>
            </el-col>
        </el-row>
        <div class="info" v-if="String(isSearch)==='true'">
            <p>
                查询到 {{ newsInfo["total"] }}条结果, 用时{{ newsInfo["time"]}}s
            </p>
        </div>

        <el-row :gutter="20" style="margin-top: 5px">
            <el-col :span="12" :offset="3">
                <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo['data']" :keywords="newsInfo['keywords']">
                </NewsList>
            </el-col>
            <el-col :span="6">
                <HotList v-bind:hotList="hotList"> </HotList>
            </el-col>
        </el-row>

        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="totalpage" @current-change="handleCurrentChange" :current-page.sync="currentPage">
            </el-pagination>
        </div>
    </el-container>
</div>
</template>

<script>
import SearchBox from "./SearchBox.vue";
import NewsList from "./NewsList.vue";
import HotList from "./HotList.vue";
import NavBar from "./NavBar.vue";
import logo from "../assets/home.svg";
import load from "../assets/loading.gif"
import {
    getNewsList,
    getNewsClassList,
    getHotList
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
        homeicon: {
            type: String,
            default: () => logo,
        }
    },
    data() {
        return {
            //用户状态记录
            userstate: {
                username: this.$cookies.get("username") ? this.$cookies.get("username") : ""
            },
            activeIndexProp: "2",
            newsInfo: {
                data: [],
                time: 0.0001,
                total: 1000,
                keywords: [],
            },
            hotList: getHotList(this),
            currentPage: 1,
            searchinput: "",
            currentClass: 0,
            isSearch: true,
            isLoading: true,
            totalpage: 1,
        };
    },
    methods: {
        userLogout() {
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
        clearInput() {
            this.searchinput = "";
            this.isSearch = false;
            console.log("clear:", this.searchinput)
        },
        backTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
    },
    created() {
        this.isLoading = true;
        console.log("created: ", this.$route.query);
        searchResult(this);
    },
    mounted() {},
    watch: {
        $route() {
            this.isLoading = true;
            console.log("changed: ", this.$route.query);
            searchResult(this);
            console.log(this.isLoading)
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

.search-box {
    position: relative;
    width: 107%;
}

.info {
    position: relative;
    margin-left: 21%;
    color: #909399;
    font-size: 9px;
}

.pagination {
    position: relative;
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

.home-img {
    position: relative;
    max-width: 100%;
    max-height: 40px;
    margin-left: 60%;
    margin-top: 35%;
    justify-content: center;
    align-items: center;
    border-radius: 1em;
    overflow: hidden;
    display: block;
    min-height: 0;
    line-height: 0;
}
</style>
