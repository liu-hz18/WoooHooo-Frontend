<template>
<div class="news-info">
    <h4 class="news-heading">
        <a v-bind:href="link" v-line-clamp:100="1" v-html="ruleTitle()" target="_blank" :class="{active:clicked === true}" @click="clickTitle"></a>
    </h4>
    <h6 class="news-content" v-line-clamp:20="3" v-html="ruleContent()"></h6>
    <p class="news-source">
        <em>来源: {{ source }}, 时间: {{ time }}</em>
    </p>
</div>
</template>

<script>
export default {
    name: "NewsInfo",
    components: {},
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
            clicked:false
        };
    },
    computed: {

    },
    methods: {
        clickTitle(){
            this.clicked = true
        },
        ruleTitle() {
            return this.highlightString(this.title, this.keywords);
        },
        ruleContent() {
            return this.highlightString(this.content, this.keywords);
        },
        highlightString(content, keywords) {
            let titleString = content;
            if (!titleString) {
                return "";
            }
            if (keywords && keywords.length > 0) {
                let replaceReg = new RegExp('(' + keywords.join('|') + ')', "gi"); // 匹配关键字正则
                titleString = titleString.replace( // 开始替换
                    replaceReg,
                    '<span class="highlight-text" style="color:#F75F5F;">$1</span>'
                );
            }
            return titleString;
        },
        openNews() {
            window.open(this.link)
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

.news-heading {
    position: relative;
    margin-top: 0%;
    height: 5px;
}

.news-content {
    position: relative;
    height: 10%;
    font-size: 12px;
}

.news-source {
    position: relative;
    margin-top: 5%;
    height: 5%;
    font-size: 10%;
    color: #909399;
}

.active{
            color: rgb(243, 169, 162);
        }
</style>
