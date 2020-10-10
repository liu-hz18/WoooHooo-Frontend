<template>
  <div class="news-list">
    <ul>
      <li>
        <NewsItem
          v-for="(newsitem, index) in newsList"
          v-bind:key="index"
          :title="newsitem.title"
          :content="newsitem.content"
          :source="newsitem.source"
          :time="newsitem.time"
          :imgurl="newsitem.imgurl"
          :link="newsitem.link"
          :keywords="keywords"
        >
        </NewsItem>
      </li>
    </ul>
  </div>
</template>

<script>
import NewsItem from "./NewsItem.vue";

export default {
  name: "NewsList",
  components: {
    NewsItem,
  },
  props: {
    newsList: {
      type: Array,
      default: () =>
        new Array(6).fill({
          uid: 0,
          link: "www.baidu.com",
          title: "This is a news Title " + 0,
          content: "This is a news content",
          imgurl: "http://inews.gtimg.com/newsapp_ls/0/12576682689_640330/0",
          source: "新华网",
          time: "2020.1.1",
        }),
    },
    keywords: {
      type: Array,
      default: () =>
        [""]
    }
  },
  data() {
    return {
      
    };
  },
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
  color: #42b983;
}
</style>
