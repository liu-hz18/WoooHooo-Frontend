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
import API from "../utils/API.js";
export default {
    name: "NewsInfo",
    components: {},
    props: {
        username:{
            type:String,
            default: () => "Info username"
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
            clicked:false
        };
    },
    computed: {

    },
    methods: {
        clickTitle(){
            this.clicked = true
            if(this.username != ""){
                //将用户行为发送给后端
                var request = new XMLHttpRequest()
                //异步？
                request.open(API.POST_USER_CLICK.method, API.POST_USER_CLICK.path, true)
                /*request.onreadystatechange = function () {
                                console.log("从后端收到：")
                                console.log(request.readyState, request.status, request.responseText)
                }*/
                request.send(JSON.stringify({
                    username:this.username,
                    newsinfo:{
                            uid: this.uid,
                            title: this.title,
                            imgurl: this.imgurl,
                            content:this.content,
                            link: this.link,
                            source: this.source,
                            time: this.time,
                            keywords: this.keywords,
                    }
                    
                }))
                console.log("用户："+this.username+" 点击了新闻："+this.title)
            }
            else{
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
