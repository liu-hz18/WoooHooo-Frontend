<template>
<div class="hot-list">
    <el-card>
        <em class="el-icon-date"> 今日热榜</em>
        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
        <ul v-if="!isLoading">
            <li v-for="(hotnews, index) in hotList" v-bind:key="index">
                <div class="hot-item">
                    <ul>
                        <li>
                            <a v-bind:href="hotnews.link" target="_blank" v-line-clamp:100="1">
                                {{ hotnews.title }}
                            </a>
                        </li>
                        <li>
                            <em class="el-icon-date" type="flex" justify="end"> {{ hotnews.time }} </em>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </el-card>
</div>
</template>

<script>
import {
    getHotList
} from "../datas/newslist.js";
import load from "../assets/loading.gif"
export default {
    name: "HotList",
    components: {},
    props: {
        loadgif: {
            type: String,
            default: () => load,
        },
    },
    data() {
        return {
            isLoading: false,
            hotList: getHotList(this),
        }
    }
};
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

a {
    color: #00809d;
    text-decoration: none;
}

a:hover {
    color: #6c5ce7;
    text-decoration: underline;
    transition: all .1s;
    -moz-transition: all .1s;
    -webkit-transition: all .1s;
    -o-transition: all .1s;
}

.el-icon-date {
    color: #636e72;
    cursor: default;
}

.hot-list {
    margin-top: 15px;
}

.hot-item {
    position: relative;
    width: 100%;
}

#left {
    position: relative;
    float: left;
    margin-bottom: 4%;
}

#right {
    position: relative;
    float: right;
    margin-bottom: 4%;
}
</style>
