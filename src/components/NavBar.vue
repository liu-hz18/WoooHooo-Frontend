<template>
<div class="navigation-bar">
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1">个人中心</el-menu-item>
        <el-submenu index="2">
            <template slot="title">分类新闻</template>
            <el-menu-item index="2-0">热点</el-menu-item>
            <el-menu-item index="2-1">国内</el-menu-item>
            <el-menu-item index="2-2">国际</el-menu-item>
            <el-menu-item index="2-3">军事</el-menu-item>
            <el-menu-item index="2-4">财经</el-menu-item>
            <el-menu-item index="2-5">娱乐</el-menu-item>
            <el-menu-item index="2-6">体育</el-menu-item>
            <el-menu-item index="2-7">科技</el-menu-item>
            <el-menu-item index="2-8">游戏</el-menu-item>
            <el-menu-item index="2-9">文化</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">前往新闻网站</template>
            <el-menu-item index="3-1"><a href="https://news.qq.com/" rel="noopener noreferrer" target="_blank">腾讯新闻</a></el-menu-item>
            <el-menu-item index="3-2"><a href="https://news.sina.com.cn/" rel="noopener noreferrer" target="_blank">新浪新闻</a></el-menu-item>
            <el-menu-item index="3-3"><a href="http://www.people.com.cn/" rel="noopener noreferrer" target="_blank">人民网</a></el-menu-item>
        </el-submenu>
        <el-menu-item index="4" v-if="isSearch==='false'">
            <el-tag>{{newsType}}</el-tag>
        </el-menu-item>
        <el-row style="margin-top: 10px; margin-bottom: 10px; display: flex; justify-content: flex-end; ">
            <div class="login-bar">
                <el-button round type="success" slot="append" icon="el-icon-user-solid" @click="handleLogin">{{loginBtnText}}</el-button>
                <el-button round type="" slot="append" icon="el-icon-user" @click="handleQuit">退出</el-button>
            </div>
        </el-row>
    </el-menu>
</div>
</template>

<script>
import newsClassMap from "../datas/newslist.js"

export default {
    name: "NavBar",
    props: {
        //用户状态记录
        username:{
            type:String,
            default: () =>"Nike"
        },
        activeIndexProp: String,
        isSearch: String,
    },
    data() {
        return {
            loginBtnText:(this.username==="")?"登录":this.username,
            activeIndex: this.activeIndexProp,
            subitem: 0,
            
        };
    },
    computed: {
        newsType() {
            return newsClassMap[this.subitem];
        },
    },
    methods: {
        handleSelect(key, keyPath) {
            if (keyPath[0] === "2") {
                this.subitem = String(keyPath[1].split('-')[1]);
                console.log(this.subitem);
                
                this.$router.push({
                    name: 'SearchResult',
                    query: {
                        query: this.subitem,
                        issearch: false
                    }
                });
            } else if (keyPath[0] === "0") {
                
                this.$router.push({
                    name: 'Home'
                });
            }
            //用户个人中心页面
            else if(keyPath[0] === "1"){
                if(this.username != ""){
                    this.$router.push({
                        name: 'Center'
                    });
                }
                else{
                    this.$router.push({
                        name: 'Login'
                    });
                }
            }
        },
        handleLogin() {
            if(this.username != ""){
                this.$notify({
                    type: 'success',
                    message: '您已经在线了！',
                    duration: 3000
                })
            }
            else{
                this.$router.push({
                    name: 'Login'
                });
            }
            
        },
        handleQuit() {
            //用户退出
            if(this.username != ""){
                this.loginBtnText = "登录"
                this.$notify({
                    type: 'success',
                    message: this.username + '，下线成功！',
                    duration: 3000
                })

                //
                this.$emit("user-logout")

            }
            else{
                this.$notify({
                    type: 'error',
                    message: '您已不在线上！',
                    duration: 3000
                })
            }
        }
    },
    created() {
        //this.activeIndex = "0";
        this.subitem = Number(this.$route.query.query);
        console.log("create", this.subitem)
    },
    watch: {},
};
</script>

<style>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
