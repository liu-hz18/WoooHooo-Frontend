<template>
<div class="home">
    <el-container>
        <el-header>
            <NavBar v-bind:activeIndexProp="activeIndexProp" :username="userstate.username" @user-logout="userLogout" @userlogin="userlogin"> </NavBar>
        </el-header>

        <el-row :gutter="20">
            <el-col :span="4" :offset="10">
                <div class="home-icon">
                    <img v-bind:src="homeicon" alt="WoooHooo~" />
                </div>
            </el-col>
        </el-row>

        <SearchBox class="home-search" v-bind:username="userstate.username" style="position: relative; width: 60%; margin-top: 1.5%; margin-left: 18%; margin-right: 40%;"></SearchBox>

        <el-container>
            <div class="news">
                <el-tabs type="border-card" v-model="activeTab" @tab-click="handleClick">
                    <el-tab-pane v-if="rec_visible">
                        <span slot="label"><em class="el-icon-date"></em>推荐</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>热点</span>
                        <el-row :gutter="15">
                            <el-col :span="15">
                                <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                                <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                                <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                            </el-col>
                            <el-col :span="9">
                                <HotList v-bind:hotList="hotList"> </HotList>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>时政</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>国际</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>军事</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>财经</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>娱乐</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>体育</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>科技</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>游戏</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>文化</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label"><em class="el-icon-date"></em>社会</span>
                        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
                        <NewsList v-if="!isLoading" v-bind:username="userstate.username" :newsList="newsInfo.data" :loadingmore="loadingmore" @load-more="loadmore"> </NewsList>
                        <img v-if="!isLoading" class="loadmore-img" v-bind:src="loadmoregif" alt="WoooHooo~" />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-container>
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
import {
    getNewsClassList,
    getHotList
} from "../datas/newslist.js";
import logo from "../assets/home.svg";
import load from "../assets/loading.gif"
import loadmore from "../assets/loadmore.gif";
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
        loadmoregif: {
            type: String,
            default: () => loadmore,
        },
    },
    data() {
        return {
            //推荐一栏是否可见
            rec_visible:this.$cookies.get("username") ? true : false,
            //rec_visible :true,
            //用户状态记录
            userstate: {
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
            hotList: getHotList(this),
            activeTab: "0",
            pageNumber: 0,
            isLoading: false,
            count: 0,
            loadingmore: false,
        };
    },
    computed: {},
    methods: {
        userlogin(name) {
            this.userstate.username = name;
            this.rec_visible = true;
        },
        handleClick() {
            getNewsClassList(this.activeTab, this.pageNumber, 5, this);
        },
        userLogout() {
            this.$cookies.remove("username")
            this.userstate.username = ""
            this.rec_visible = false;
        },
        loadmore() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            let bottom = Math.round(scrollTop + windowHeight) >= scrollHeight;
            setTimeout(() => {
                if (bottom && !this.loadingmore) {
                    console.log("loadmore", this.count, bottom)
                    this.count += 1
                    getNewsClassList(this.activeTab, this.count, 5, this, true);
                }
            }, 800);
        },
        backTop(e) {
            console.log("backtop", e)
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
    },
    created() {
        this.backTop();
        getNewsClassList(this.activeTab, 0, 5, this);
        window.addEventListener('beforeunload', e => this.backTop(e));
    },
    destroyed() {
        window.removeEventListener('beforeunload', e => this.backTop(e));
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

.el-header {
    padding: 0 0;
}

.home-search {
    position: relative;
    margin-top: 1%;
    margin-left: 19%;
    width: 100%;
}

.home-icon {
    margin-top: 17px;
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
    max-width: 120%;
    max-height: 120px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 18%;
    margin-bottom: 18%;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    display: block;
}

.loadmore-img {
    margin-top: 0%;
    margin-bottom: 0%;
}
</style>
