<template>
<div class="search-box">
    <el-container>
        <el-main>
            <div class="searchbox">
                <el-input placeholder="请输入内容" ref="searchbox" v-model="searchinput" class="input-with-select" @focus="focus" @blur="blur" @keyup.enter.native="searchHandler" @input="textChange" clearable prefix-icon="el-icon-search">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="Woohoo~" value="1"></el-option>
                        <el-option label="Baidu" value="2"></el-option>
                        <el-option label="Bing" value="3"></el-option>
                    </el-select>
                    <el-button type="primary" slot="append" icon="el-icon-search" @click="searchHandler">搜索</el-button>
                </el-input>

                <el-card @mouseenter="enterSearchBoxHanlder" v-if="isSearch" class="box-card" id="search-box">
                    <dl v-if="isHistorySearch">
                        <dt class="search-title" v-show="history">历史搜索</dt>
                        <dt class="remove-history" v-show="history" @click="removeAllHistory">
                            <div class="history-clean">
                                <em class="el-icon-delete">清空历史记录</em>
                            </div>
                        </dt>
                        <div class="history-tag">
                            <el-tag v-for="search in historySearchList" :key="search.id" closable :type="search.type" @close="closeHandler(search)" @click="searchinput = search.name">{{ search.name }}</el-tag>
                        </div>
                        <dt class="search-title">热门搜索</dt>
                        <div class="hot-item">
                            <dd v-for="(search, index) in hotSearchList" :key="index" @click="searchinput = search">
                                {{ search }}
                            </dd>
                        </div>
                    </dl>
                    <dl v-if="isSearchList">
                        <dd v-for="search in searchList" :key="search.id">
                            {{ search }}
                        </dd>
                    </dl>
                </el-card>
            </div>
        </el-main>
    </el-container>
</div>
</template>

<script>
import RandomUtil from "../utils/RandomUtil";
import Store from "../utils/store";
import API from "../utils/API.js";

export default {
    name: "SearchBox",
    props: {
        username: {
            type: String,
            default: () => "Searchbox username"
        },
        searchInputProp: String,
    },
    data() {
        return {
            searchinput: this.searchInputProp, //搜索内容, 为了保证进入类别后输入框清空，请不要更改到data中。
            select: '',
            isFocus: false, //是否聚焦
            hotSearchList: new Array(5).fill("热门搜索"), //热门搜索数据
            historySearchList: [], //历史搜索数据
            searchList: ["暂无数据"], //搜索返回数据,
            history: false,
            types: ["", "success", "info", "warning", "danger"], //搜索历史tag式样
        }
    },
    computed: {
        isSearch() {
            return this.isFocus;
        },
        isHistorySearch() {
            return this.isFocus && !this.search; //获取了焦点并且搜索框内容为空显示热门搜索和历史搜索
        },
        isSearchList() {
            return this.isFocus && this.search; //获取了焦点并且搜索框内容不为空直接显示搜索列表
        },
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        focus() { //获得焦点
            this.isFocus = true;
            this.historySearchList =
                Store.loadHistory() == null ? [] : Store.loadHistory();
            this.history = this.historySearchList.length == 0 ? false : true;
        },
        blur() { //失去焦点
            var self = this;
            this.searchBoxTimeout = setTimeout(function () {
                self.isFocus = false;
            }, 300);
        },
        textChange() {},
        enterSearchBoxHanlder() {
            clearTimeout(this.searchBoxTimeout);
        },
        searchHandler() {
            if (this.searchinput.length === 0)
                return;
            //随机生成搜索历史tag式样
            console.log("input:", this.searchinput);
            //this.$emit('update-news', getNewsList(this.searchinput, 0, 10));
            this.$emit("text-change", this.searchinput);
            //将用户的搜索内容发给后端
            if (this.username != "") {
                var request = new XMLHttpRequest()
                //异步？
                request.open(API.POST_USER_SEARCH.method, API.POST_USER_SEARCH.path, true)
                /*request.onreadystatechange = function () {
                                console.log("从后端收到：")
                                console.log(request.readyState, request.status, request.responseText)
                }*/
                request.send(JSON.stringify({
                    username: this.username,
                    data: this.searchinput
                }))
                console.log("用户：" + this.username + " 搜索了关键词：" + this.searchinput)
            }
            this.$router.push({
                name: 'SearchResult',
                query: {
                    query: this.searchinput,
                    issearch: true
                }
            });
            console.log("path changed")
            let n = RandomUtil.getRandomNumber(0, 5);
            let exist =
                this.historySearchList.filter((value) => {
                    return value.name == this.searchinput;
                }).length == 0 ?
                false :
                true;
            if (!exist) {
                this.historySearchList.push({
                    name: this.searchinput,
                    type: this.types[n],
                });
                Store.saveHistory(this.historySearchList);
            }
            this.history = this.historySearchList.length == 0 ? false : true;
        },
        closeHandler(search) {
            this.historySearchList.splice(this.historySearchList.indexOf(search), 1);
            Store.saveHistory(this.historySearchList);
            clearTimeout(this.searchBoxTimeout);
            if (this.historySearchList.length == 0) {
                this.history = false;
            }
        },
        removeAllHistory() {
            Store.removeAllHistory();
        },

    },
    created() {},
    mounted() {},

}
</script>

<style>
.searchbox {
    margin-top: 20px;
    margin-right: 600px;
}

.search-title {
    color: #bdbaba;
    font-size: 15px;
    margin-bottom: 5px;
}

.remove-history {
    color: #bdbaba;
    font-size: 15px;
    float: right;
    margin-top: -22px;
}

.history-clean {
    cursor: pointer;
}

.history-tag {
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 5px;
}

.hot-item {
    cursor: pointer;
}

.search-box {
    position: relative;
    width: 100%;
    height: auto;
    padding-bottom: 0%;
    margin-left: 0%;
    z-index: 200;
}

#search {
    background-color: #ffc300;
    border-radius: 0%;
}
</style>
