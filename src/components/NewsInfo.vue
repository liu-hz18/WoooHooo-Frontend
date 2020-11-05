<template>
<div class="news-info">
    <p class="news-heading">
        <a v-bind:href="link" v-line-clamp:100="1" v-html="ruleTitle()" target="_blank" :class="{active:clicked === true}" @click="clickTitle"></a>
    </p>
    <span class=news-time> {{time}} </span>
    <p class="news-content" v-line-clamp:20="3" v-html="ruleContent()"></p>
    <p class="news-source"> {{ " " + source }} </p>
</div>
</template>

<script>
import API from "../utils/API.js";
export default {
    name: "NewsInfo",
    components: {},
    props: {
        username: {
            type: String,
            default: () => "Info username"
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
            clicked: false
        };
    },
    computed: {

    },
    methods: {
        clickTitle() {
            this.clicked = true
            if (this.username != "") {
                //将用户行为发送给后端
                var request = new XMLHttpRequest()
                //异步？
                request.open(API.POST_USER_CLICK.method, API.POST_USER_CLICK.path, true)
                request.onreadystatechange = function () {
                                console.log("从后端收到：")
                                console.log(request.readyState, request.status, request.responseText)
                }
                request.send(JSON.stringify({
                    username: this.username,
                    newsinfo: {
                        uid: this.uid,
                        title: this.title,
                        imgurl: this.imgurl,
                        content: this.content,
                        link: this.link,
                        source: this.source,
                        time: this.time,
                        //keywords: this.keywords,
                    }

                }))
                console.log("用户：" + this.username + " 点击了新闻：" + this.title)
                console.log({
                        uid: this.uid,
                        title: this.title,
                        imgurl: this.imgurl,
                        content: this.content,
                        link: this.link,
                        source: this.source,
                        time: this.time,
                        //keywords: this.keywords,
                    })
            } else {
                console.log("用户未登录")
            }
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
            if (keywords && keywords.length > 0 && keywords[0] !== "") {
                console.log(keywords)
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
    color: #00809d;
}

li {
    margin-bottom: 5px;
}

.news-heading {
    position: relative;
    margin-top: 0%;
    margin-bottom: 3%;
    height: 5px;
    font-size: 115%;
    font-family: "Arial, sans-serif, Courier New";
    font-weight: 550;
    text-decoration-line: underline;
}

.news-content {
    position: relative;
    font-size: 87%;
    line-height: 140%;
    margin-block-start: 0.1em;
    margin-block-end: 0.4em;
    color: #00000F;
    font-family: "Arial, sans-serif, Courier New";
}

.news-source {
    position: relative;
    font-size: 20%;
    color: #909399;
}

.news-time {
    position: relative;
    font-size: 20%;
    color: #909399;
}

.news-info {
    margin-block-end: 0.5em;
}

.active {
    color: #771caa;
}
</style>
