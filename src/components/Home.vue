<template>
<div class="home">
    <el-container>
        <el-header>
            <NavBar v-bind:activeIndexProp="activeIndexProp" :username="userstate.username" @user-logout="userLogout"> </NavBar>
        </el-header>

        <el-row :gutter="20">
            <el-col :span="4" :offset="11">
                <div class="home-icon">
                    <img v-bind:src="homeicon" alt="WooHoo~" />
                </div>
            </el-col>
        </el-row>

        <SearchBox v-bind:username="userstate.username"> </SearchBox>

        <el-container>
            <div class="news">
                <el-tabs type="border-card" v-model="activeTab" @tab-click="handleClick">
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>热点</span>
                        <el-row :gutter="15">
                            <el-col :span="15">
                                <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                                <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                            </el-col>
                            <el-col :span="9">
                                <HotList v-bind:hotList="hotList"> </HotList>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>国内</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>国际</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>军事</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>财经</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>娱乐</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>体育</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>科技</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>游戏</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>文化</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>社会</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-container>
    </el-container>
</div>
</template>

<script>
import {
    getNewsClassList
} from "../datas/newslist.js";
import logo from "../assets/search_icon.png";
import load from "../assets/loading.gif"
import NewsList from "./NewsList.vue";
import HotList from "./HotList.vue";
import SearchBox from "./SearchBox.vue";
import NavBar from "./NavBar.vue";

export default {
    name: "Home",
    components: {
        NewsList,
        HotList,
        SearchBox,
        NavBar,
    },
    props: {
        homeicon: {
            type: String,
            default: () => logo,
        },
        loadgif: {
            type: String,
            default: () => load,
        },
    },
    data() {
        return {
            //用户状态记录
            userstate: {
                //username:this.$route.params.username?this.$route.params.username:""
                username: this.$cookies.get("username") ? this.$cookies.get("username") : ""
            },
            activeIndexProp: "0",
            searchinput: "中国",
            keywordlist: ["news", "is"],
            newsInfo: {

                data: [],
                time: 0.0001,
                total: 1000,
                keywords: [],
            },
            hotList: new Array(10).fill({
                uid: 0,
                link: "https://www.baidu.com",
                title: "This is a hot news news " + 0,
                hot: "100万",
            }),
            activeTab: "0",
            pageNumber: 0,
            isLoading: false,
        };
    },
    computed: {},
    methods: {
        handleClick() {
            getNewsClassList(this.activeTab, this.pageNumber, 10, this);
        },
        userLogout() {
            this.$cookies.remove("username")
            this.userstate.username = ""
        }
    },
    created() {
        getNewsClassList(this.activeTab, 0, 10, this);
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

.home-icon {
    margin-top: 20px;
    height: 100px;
    width: auto;
}

.news {
    position: relative;
    width: 80%;
    margin-top: 3%;
    margin-left: 10%;
    margin-right: 10%;
}

img {
    position: relative;
    margin-right: auto;
    margin-left: auto;
    margin-top: 18%;
    margin-bottom: 18%;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    align-items: center;
}
</style>
