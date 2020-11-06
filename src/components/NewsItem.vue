<!-- 新闻条目 -->
<template>
<div class="NewsItem">
    <el-card v-if="haveImg">
        <div class="news-body">
            <el-col :span="18">
                <NewsInfo v-bind:username="username" :link="link" :title="title" :content="content" :source="source" :time="time" :keywords="keywords" :imgurl="imgurl" :uid="uid"></NewsInfo>
            </el-col>
            <el-col :span="5">
                <a v-bind:href="imgurl">
                    <img class="news-img" v-bind:src="imgurl" alt="News Image" />
                </a>
            </el-col>
        </div>
    </el-card>

    <el-card v-if="!haveImg">
        <div class="news-body">
            <el-col :span="24">
                <NewsInfo v-bind:username="username" :link="link" :title="title" :content="content" :source="source" :time="time" :keywords="keywords" :imgurl="imgurl" :uid="uid"></NewsInfo>
            </el-col>
        </div>
    </el-card>
</div>
</template>

<script>
import NewsInfo from "./NewsInfo.vue";

export default {
    name: "NewsItem",
    components: {
        NewsInfo,
    },
    props: {
        username: {
            type: String,
            default: () => "Item username"
        },
        uid: String,
        title: String,
        imgurl: String,
        content: String,
        link: String,
        source: String,
        time: String,
        keywords: Array,
    },
    data() {
        return {

        };
    },
    computed: {
        haveImg() {
            console.log("img:", this.imgurl)
            return this.imgurl !== "" && this.imgurl !== "blank";
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

a {
    color: #42b983;
}

li {
    margin-bottom: 5px;
}

.news-img {
    position: relative;
    max-width: 120%;
    max-height: 110px;
    margin-left: 10%;
    background: #f5f5f6;
    justify-content: center;
    align-items: center;
    border-radius: 1em;
    overflow: hidden;
    display: block;
    min-height: 0;
    line-height: 0;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, .5);
}

.NewsItem {
    margin-bottom: 5px;
}

.news-body {
    position: relative;
    margin-left: 0%;
    margin-right: 0%;
}
</style>
