<template>
<div class="news-list">
    <ul v-infinite-scroll="load" infinite-scroll-delay="500" infinite-scroll-disabled="loadingmore" infinite-scroll-immediate-check=false>
        <li>
            <NewsItem v-for="(newsitem, index) in newsList" v-bind:key="index" :username="username" :title="newsitem.title" :content="newsitem.content" :source="newsitem.source" :time="newsitem.time" :imgurl="newsitem.imgurl" :uid="newsitem.uid" :link="newsitem.link" :keywords="keywords">
            </NewsItem>
        </li>
    </ul>
</div>
</template>

<script>
import NewsItem from "./NewsItem.vue";
import infiniteScroll from 'vue-infinite-scroll';
import load from "../assets/loading.gif"

export default {
    name: "NewsList",
    components: {
        NewsItem,
    },
    directives: {
        infiniteScroll,
    },
    props: {
        username: {
            type: String,
            default: () => "Bob"
        },
        newsList: {
            type: Array,
            default: () =>
                new Array(6).fill({
                    uid: "0",
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
            default: () => [""]
        },
        loadgif: {
            type: String,
            default: () => load,
        },
    },
    data() {
        return {
            loadingmore: false,
        };
    },
    methods: {
        load() {
            if (!this.loadingmore) {
                this.$emit("load-more")
            }
        },
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

.news-list {
    margin-top: -15px;
}
</style>
