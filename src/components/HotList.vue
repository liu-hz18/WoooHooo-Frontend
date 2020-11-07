<template>
<div class="hot-list">
    <el-card>
        <em class="el-icon-date"> 今日热榜</em>
        <img v-if="isLoading" v-bind:src="loadgif" alt="WoooHooo~" />
        <div class="hot-item">
            <ul v-if="!isLoading">
                <tbody>
                    <tr v-for="(hotnews, index) in hotList" v-bind:key="index">
                        <td v-if="index === 0">
                            <span style="color: #FE2D46;">{{index+1}}</span>
                            <a v-bind:href="hotnews.link" target="_blank" :title="hotnews.time">
                                {{ hotnews.title }}
                            </a>
                        </td>
                        <td v-if="index === 1 ">
                            <span style="color: #F60;">{{index+1}}</span>
                            <a v-bind:href="hotnews.link" target="_blank" :title="hotnews.time">
                                {{ hotnews.title }}
                            </a>
                        </td>
                        <td v-if="index === 2">
                            <span style="color: #FAA90E;">{{index+1}}</span>
                            <a v-bind:href="hotnews.link" target="_blank" :title="hotnews.time">
                                {{ hotnews.title }}
                            </a>
                        </td>
                        <td v-if="index > 2">
                            <span>{{index+1}}</span>
                            <a v-bind:href="hotnews.link" target="_blank" :title="hotnews.time">
                                {{ hotnews.title }}
                            </a>
                        </td>
                    </tr>

                </tbody>
            </ul>
        </div>
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

span {
    opacity: 1;
    height: 22px;
    line-height: 30px;
    margin-right: 6px;
    margin-left: 3px;
    display: inline-block;
    background: 0 0;
    color: #9195A3;
    width: 18px;
    font-size: 16px;
    letter-spacing: -1px;

}

a {
    color: #00809d;
    text-decoration: none;
    line-height: 30px;
    cursor: pointer;
    font: 17px Arial, sans-serif;
    max-width: 340px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: middle;
    display: inline-block;
    -webkit-line-clamp: 1;
    text-align: left;
    word-break: normal;
}

td {
    vertical-align: top;
    display: table-cell;
    opacity: 1;
    float: left;
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
</style>
