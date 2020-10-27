<template>
<el-container>
    <div class="result">
        <el-header>
            <NavBar> </NavBar>
        </el-header>

        <div class="search-box">
            <SearchBox ref="searchbox" @update-news="updateNews" @text-change="updateInput" v-bind:searchInputProp="searchinput">
            </SearchBox>
        </div>
        <div class="info" v-if="isSearch==='true'">
            <p>
                查询到 {{ newsInfo["total"] }}条结果, 用时{{
            Math.max(newsInfo["time"], 0.0)
          }}s
            </p>
        </div>

        <el-row :gutter="20">
            <el-col :span="12" :offset="3">
                <NewsList v-bind:newsList="newsInfo['data']" :keywords="newsInfo['keywords']">
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
    </div>
</el-container>
</template>

<script>
//import { highlightKeyWords } from "../utils/highlight.js";
import SearchBox from "./SearchBox.vue";
import NewsList from "./NewsList.vue";
import HotList from "./HotList.vue";
import NavBar from "./NavBar.vue";
import {
    getNewsList,
    getNewsClassList
} from "../datas/newslist.js";

export default {
    name: "SearchResult",
    components: {
        SearchBox,
        NewsList,
        HotList,
        NavBar,
    },
    inject: ['reload'],
    props: {},
    data() {
        return {
            newsInfo: {
                data: [],
                time: 0.0001,
                total: 1000,
                keywords: [],
            },
            hotList: new Array(10).fill({
                uid: 0,
                link: "www.baidu.com",
                title: "This is a hot news news" + 0,
                hot: "100万",
            }),
            currentPage: 1,
            searchinput: "",
            currentClass: 0,
            isSearch: true,
        };
    },
    methods: {
        updateNews(newsInfo) {
            this.newsInfo = newsInfo;
            this.currentPage = 1;
        },
        handleCurrentChange() {
            console.log("input in result ", this.searchinput);
            if (this.isSearch) {
                this.newsInfo = getNewsList(this.searchinput, this.currentPage - 1, 10);
            } else {
                this.newsInfo = getNewsClassList(
                    this.currentClass,
                    this.currentPage - 1,
                    10
                );
            }
        },
        updateInput(searchinput) {
            this.searchinput = searchinput;
            this.isSearch = true;
        },
    },
    created() {
        console.log("created: ", this.$route.query);
        if ("{}" === JSON.stringify(this.$route.query)) {
            this.$router.push({
                name: "Home"
            });
        }
        this.isSearch = String(this.$route.query.issearch);
        if (this.isSearch === "true") {
            this.searchinput = this.$route.query.query;
            this.newsInfo = getNewsList(this.searchinput, 0, 10);
        } else {
            this.searchinput = "";
            this.newsInfo["keywords"] = [];
            this.currentClass = Number(this.$route.query.query) - 1;
            this.newsInfo["data"] = getNewsClassList(this.currentClass, 0, 10);
        }
    },
    mounted() {},
    watch: {
        $route() {
            console.log("changed: ", this.$route.query);
            if ("{}" === JSON.stringify(this.$route.query)) {
                this.$router.push({
                    name: "Home"
                }); //重定向到Home
            }
            this.isSearch = String(this.$route.query.issearch);
            if (this.isSearch === "true") {
                this.searchinput = this.$route.query.query;
                this.newsInfo = getNewsList(this.searchinput, 0, 10);
            } else {
                this.searchinput = "";
                this.newsInfo["keywords"] = [];
                this.currentClass = Number(this.$route.query.query) - 1;
                this.newsInfo["data"] = getNewsClassList(this.currentClass, 0, 10);
            }
            this.reload();
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
</style>
