<!-- 新闻条目 -->
<template>
  <div class="NewsItem">
    <el-card v-if="haveImg">
    <div class="news-body">
    <el-row :gatter="20">
    <el-col :span="19">
            <NewsInfo v-bind:link="link" :title="title" :content="content" :source="source" :time="time" :keywords="keywords"></NewsInfo>
            </el-col>
            <el-col :span="5">
            <a v-bind:href="imgurl">
              <img class="news-img" v-bind:src="imgurl" alt="News Image" />
            </a>
            </el-col>
            </el-row>
      </div>
    </el-card>

    <el-card v-if="!haveImg">
          <NewsInfo v-bind:link="link" :title="title" :content="content" :source="source" :time="time" :keywords="keywords"></NewsInfo>
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
  width: 100%;
  margin-top: 20%;
  margin-left: 5%;
}
.NewsItem {
  margin-bottom: 5px;
}
</style>
