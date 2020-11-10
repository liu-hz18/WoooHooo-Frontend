<template>
<div class="result">
    <el-container>
        <el-header>
            <NavBar v-bind:activeIndexProp="activeIndexProp" :isSearch="String(isSearch)" :username.sync="userstate.username" @user-logout="userLogout" @choose-type="clearInput" @userlogin="userlogin"> </NavBar>
        </el-header>
        <el-row style="margin-top: 0px; height: 90px;">
            <el-col :span="3">
                <img class="home-img" v-bind:src="homeicon" alt="WoooHooo~" />
            </el-col>
            <el-col :span="8">
                <div class="search-box" style=" position: relative;margin-right: 0%; margin-top: 3%;">
                    <SearchBox ref="searchbox" @update-news="updateNews" @text-change="updateInput" v-bind:username="userstate.username" :searchInputProp.sync="searchinput" :key="searchinput">
                    </SearchBox>
                </div>
            </el-col>
            <el-col :span="8" :offset="1" style="margin-top: 45px;">
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        时间选择
                        <em class="el-icon-arrow-down el-icon--right"></em>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">一天内</el-dropdown-item>
                        <el-dropdown-item command="1">一周内</el-dropdown-item>
                        <el-dropdown-item command="2">一月内</el-dropdown-item>
                        <el-dropdown-item command="3">全部</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>

        <div class="info" v-if="String(isSearch)==='true'">
            <p>
                WoooHooo~ 为您搜索到约 {{ newsInfo["total"] }}条结果, 用时约{{ newsInfo["time"]}}s
            </p>
        </div>
        <el-row :gutter="12" style="margin-top: 10px">
            <el-col :span="12" :offset="2">
                <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo['data']" :keywords="newsInfo['keywords']">
                </NewsList>
                <el-divider v-if="!isLoading"></el-divider>
                <h4 v-if="!isLoading && String(isSearch) === 'true'">相关搜索</h4>
                <div v-if="!isLoading && String(isSearch) === 'true'" class="related-search">
                    <el-tag class="related-item" v-for="(search, index) in relatedSearch" :key="index" @click="newSearch(search)" :effect="'light'" :type="''">
                        {{ search }}
                    </el-tag>
                </div>
            </el-col>
            <el-col :span="7">
                <HotList v-bind:hotList="hotList"> </HotList>
            </el-col>
        </el-row>

        <div class="pagination">
            <el-pagination layout="prev, pager, next, jumper" :pager-count="11" :total="totalpage" @current-change="handleCurrentChange" :current-page.sync="currentPage">
            </el-pagination>
        </div>
    </el-container>
    <el-backtop>
        <div style="
        height: 100%;
        width: 180%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
            ToTop
        </div>
    </el-backtop>
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
            hotList: [],
            currentPage: 1,
            searchinput: "",
            currentClass: 0,
            isSearch: true,
            isLoading: true,
            totalpage: 1,
            screenHeight: document.body.clientHeight,
            relatedSearch: [],
            relation: 3, // 当前搜索时间限制
        };
    },
    methods: {
        userlogin(name) {
            console.log("userlogin in result", name, this.$cookies.get("username"))
            this.userstate.username = name;
        },
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
        newSearch(search) {
            this.currentPage = 1;
            this.searchinput = search;
            this.$router.push({
                name: 'SearchResult',
                query: {
                    query: this.searchinput,
                    issearch: true
                }
            });
            this.backTop()
        },
        handleCommand(command) {
            this.relation = Number(command);
            this.currentPage = 1;
            getNewsList(this.searchinput, 0, 10, this);
        }
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
            this.currentPage = 1;
            searchResult(this);
            console.log(this.isLoading)
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
html,
body {
    height: 100%;
}

#result {
    height: 100%;
}

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
    font-size: 15px;
}

a {
    color: #42b983;
}

.el-header {
    padding: 0 0;
}

.search-box {
    position: relative;
    width: 107%;
}

.info {
    position: relative;
    margin-left: 16%;
    color: #909399;
    font-size: 11px;
}

.pagination {
    position: relative;
    margin-left: 12%;
    margin-top: 1%;
    margin-bottom: 5%;
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
    margin-top: 20%;
    margin-bottom: 20%;
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
    margin-top: 23%;
    justify-content: center;
    align-items: center;
    border-radius: 1em;
    overflow: hidden;
    display: block;
    min-height: 0;
    line-height: 0;
}

.related-item {
    margin-right: 25px;
    margin-bottom: 15px;
    font-family: sans-serif;
    cursor: pointer;
    font-size: 14px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>
