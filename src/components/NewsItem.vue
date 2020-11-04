<!-- 新闻条目 -->
<template>
<div class="NewsItem">
    <el-card v-if="haveImg">
        <div class="news-body">
            <el-col :span="16">
                <NewsInfo v-bind:username="username" :link="link" :title="title" :content="content" :source="source" :time="time" :keywords="keywords"></NewsInfo>
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
                <NewsInfo v-bind:username="username" :link="link" :title="title" :content="content" :source="source" :time="time" :keywords="keywords"></NewsInfo>
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
        username:{
            type:String,
            default: () => "Item username"
        },
        uid: Number,
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
            return this.imgurl != "";
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
    width: 140%;
    margin-top: 10%;
    margin-left: 20%;
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
