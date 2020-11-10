<template>
<div class="navigation-bar">
    <el-menu :default-active=" activeIndex" class="el-menu" mode="horizontal" @select="handleSelect" active-text-color="#9980FA" text-color="#5758BB">
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1">个人中心</el-menu-item>
        <el-submenu index="2">
            <template slot="title">分类新闻</template>
            <el-menu-item index="2-0">
                <el-badge is-dot class="item">
                    <el-tag size="medium" type="danger" effect="plain" style="border: 1px solid;">热点</el-tag>
                </el-badge>
            </el-menu-item>
            <el-menu-item index="2-1">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">时政</el-tag>
            </el-menu-item>
            <el-menu-item index="2-2">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">国际</el-tag>
            </el-menu-item>
            <el-menu-item index="2-3">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">军事</el-tag>
            </el-menu-item>
            <el-menu-item index="2-4">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">财经</el-tag>
            </el-menu-item>
            <el-menu-item index="2-5">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">娱乐</el-tag>
            </el-menu-item>
            <el-menu-item index="2-6">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">体育</el-tag>
            </el-menu-item>
            <el-menu-item index="2-7">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">科技</el-tag>
            </el-menu-item>
            <el-menu-item index="2-8">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">游戏</el-tag>
            </el-menu-item>
            <el-menu-item index="2-9">
                <el-tag size="medium" effect="plain" style="border: 2px solid #d9ecff;">文化</el-tag>
            </el-menu-item>
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
            <div class="date-info__left">{{time}}</div>
            <div class="date-info__right">
                <div>{{date}}</div>
                <div>{{day}}</div>
            </div>
            <div id="weather-v2-plugin-simple"></div>
            <div class="login-bar">
                <el-button round type="primary" slot="append" icon="el-icon-user-solid" @click="handleLogin" style="margin-right: 15px; margin-left:20px;">{{loginBtnText}}</el-button>
            </div>
            <div class="quit-bar">
                <el-button round plain type="info" slot="append" icon="el-icon-user" @click="handleQuit" style="margin-right: 7px;">退出</el-button>
            </div>
        </el-row>
    </el-menu>
</div>
</template>

<script>
window.WIDGET = {
    CONFIG: {
        "modules": "01234",
        "background": 1,
        "tmpColor": "FFFFFF",
        "tmpSize": "16",
        "cityColor": "FFFFFF",
        "citySize": 16,
        "aqiSize": 16,
        "weatherIconSize": 24,
        "alertIconSize": 18,
        "padding": "10px 10px 10px 10px",
        "shadow": "1",
        "language": "auto",
        "borderRadius": 5,
        "fixed": "false",
        "vertical": "middle",
        "horizontal": "center",
        "key": "YSkTePopy7",
        "margin-right": "10px",
    }
}
import newsClassMap from "../datas/newslist.js";
import moment from 'moment';

export default {
    name: "NavBar",
    props: {
        //用户状态记录
        username: {
            type: String,
            default: () => "Nike"
        },
        activeIndexProp: String,
        isSearch: String,
        styleObj: {
            required: false,
            type: Object
        },
    },
    data() {
        return {
            activeIndex: this.activeIndexProp,
            subitem: 0,
            time: '',
            date: '',
            day: '',
            timeInterval: null,
        };
    },
    computed: {
        newsType() {
            if (this.subitem == 1) {
                return "时政";
            }
            return newsClassMap[this.subitem];
        },
        loginBtnText() {
            return (this.username === "") ? "登录" : this.username;
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            if (keyPath[0] === "2") {
                this.subitem = String(keyPath[1].split('-')[1]);
                console.log(this.subitem);
                this.$emit("choose-type");
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
            else if (keyPath[0] === "1") {
                if (this.username != "") {
                    this.$router.push({
                        name: 'Center'
                    });
                } else {
                    this.$router.push({
                        name: 'Login'
                    });
                }
            }
        },
        handleLogin() {
            if (this.username != "") {
                this.$notify({
                    type: 'success',
                    message: '您已经在线了！',
                    duration: 3000
                })
            } else {
                this.$router.push({
                    name: 'Login'
                });
            }

        },
        handleQuit() {
            //用户退出
            if (this.username != "") {
                this.loginBtnText = "登录"
                this.$notify({
                    type: 'success',
                    message: this.username + '，下线成功！',
                    duration: 3000
                })

                //
                this.$emit("user-logout")

            } else {
                this.$notify({
                    type: 'error',
                    message: '您已不在线上！',
                    duration: 3000
                })
            }
        },
        updateTime() {
            const _this = this;
            this.timeInterval = setInterval(function () {
                _this.time = moment().format('HH:mm');
            }, 1000);
        }
    },
    created() {
        //this.activeIndex = "0";
        this.subitem = Number(this.$route.query.query);
        console.log("create", this.subitem);
        const momentNow = moment();
        this.date = momentNow.format('YYYY-MM-DD');
        const dayNameMapping = [
            '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
        ];
        console.log("dsadas", momentNow.format('e'));
        this.day = dayNameMapping[momentNow.format('e')];
        this.updateTime();
    },
    watch: {},
    mounted() {
        (function (d) {
            var c = d.createElement('link')
            c.rel = 'stylesheet'
            c.href = 'https://apip.weatherdt.com/simple/static/css/weather-simple.css?v=2.0'
            var s = d.createElement('script')
            s.src = 'https://apip.weatherdt.com/simple/static/js/weather-simple.js?v=2.0'
            var sn = d.getElementsByTagName('script')[0]
            sn.parentNode.insertBefore(c, sn)
            sn.parentNode.insertBefore(s, sn)
        })(document)
    },
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
    margin: 0 0px;
}

a {
    color: #6b9cd3;
}

.navigation-bar {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    box-shadow: 10px 5px 10px 0 rgba(0, 0, 0, 0.14);
}

.el-button--primary {
    background-color: #a3b5ff;
    border-color: white;
}

.el-button--primary:hover {
    background-color: #8c7ae6;
    border-color: white;
}

.el-button--info:hover {
    background-color: #70a1ff;
    border-color: white;
}

.date-info__left {
    float: right;
    display: inline-block;
    vertical-align: middle;
    font-size: 30px;
    margin-right: 15px;
}

.date-info__right {
    font-size: 14px;
    line-height: 1.5em;
    margin-right: 20px;
}
</style>
