<template>
<div>
    <el-container>
        <el-header>
            <NavBar v-bind:activeIndexProp="activeIndexProp" :username="userstate.username" @user-logout="userLogout"> </NavBar>
        </el-header>

    </el-container>

    <div>
        <section class="info-message">
            <div class="info-title">
                <span class="active">账号信息</span>
            </div>
            <el-form>
                <el-form-item label="用户名" class="item">
                    <span style="color: #000000;">{{userstate.username}}</span>
                </el-form-item>
                <el-form-item label="注册邮箱" class="item">
                    <span style="color: #000000;">{{userinfo.mail}}</span>
                </el-form-item>
                <el-form-item label="密码" class="item">
                    <span style="color: #4283b9;cursor: pointer;" @click="handleRstPass">重置密码</span>
                </el-form-item>
            </el-form>
        </section>

        <section class="info-message info-message2" id="my-object">
            <div class="info-title">
                <span class="active">历史足迹</span>
            </div>
            <NewsList v-bind:username="userstate.username" :newsList="newsInfo.data"> </NewsList>
        </section>
        <RstPassDialog v-bind:dialogVisible="rstPassDialog.visible" @canclebtn="closedialog" @rstpass="rstpass" />

    </div>

</div>
</template>

<script>
import {
    getBrowseNewsList
} from "../datas/newslist.js";
import logo from "../assets/home.svg";
import NavBar from "./NavBar.vue";
import NewsList from "./NewsList.vue";
import RstPassDialog from "@/components/RstPassDialog"
import API from "../utils/API.js"
import md5 from 'js-md5';
import {
    urlParam
} from "../utils/communication.js"

export default {
    name: "Home",
    components: {
        NewsList,
        NavBar,
        RstPassDialog
    },
    props: {
        homeicon: {
            type: String,
            default: () => logo,
        },

    },
    data() {
        return {

            //用户状态记录
            userstate: {
                username: this.$cookies.get("username") ? this.$cookies.get("username") : "",
            },
            userinfo: {
                mail: "xxx@xx.com"
            },
            newsInfo: {
                data: [],
                time: 0.0001,
                total: 1000,
                keywords: [],
            },
            activeIndexProp: "1",
            rstPassDialog: {
                visible: false,
            },
        };
    },
    computed: {},
    methods: {
        userLogout() {
            this.$cookies.remove("username")
            this.userstate.username = ""
            this.$router.replace('/home')
        },
        handleRstPass() {
            console.log("修改密码")
            this.rstPassDialog.visible = true
        },
        closedialog() {
            this.rstPassDialog.visible = false
        },
        rstpass(md5oldpass, newpass) {
            console.log("验证用户" + this.userstate.username + "的旧密码" + md5oldpass)
            var validrequest = new XMLHttpRequest()
            var url = urlParam(API.CHECK_USER_INFO.path, {
                useraction: "login",
                username: this.userstate.username,
                userpass: md5oldpass,
            })
            console.log(url)
            var valid = false;
            validrequest.open(API.CHECK_USER_INFO.method, url, false)
            validrequest.onreadystatechange = function () {
                console.log("从后端收到：")
                console.log(validrequest.readyState, validrequest.status, validrequest.responseText)
                if (validrequest.readyState === 4) {
                    if (validrequest.status === 200) {
                        valid = true;
                    }

                } else if (this.readyState === 1) {
                    console.log('请求中')
                } else {
                    console.log('请求失败')
                }
            }
            validrequest.send(null)

            if (valid) {
                this.rstPassDialog.visible = false
                var request = new XMLHttpRequest()
                //var parent = this
                request.open(API.RST_PASS.method, API.RST_PASS.path, false)
                request.onreadystatechange = function () {
                    console.log("从后端收到：")
                    console.log(request.readyState, request.status, request.responseText)
                }
                request.send(JSON.stringify({
                    username: this.userstate.username,
                    userpass: md5(newpass),
                }))
                this.$message({
                    type: 'success',
                    message: '密码修改成功！',
                    showClose: true
                })
            } else {
                this.$message({
                    type: 'error',
                    message: '旧密码错误！',
                    showClose: true
                })
            }
        }
    },
    created() {
        console.log("个人中心页面加载中")
        getBrowseNewsList(this.userstate.username, this);
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

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #4283b9;
}

.home-icon {
    margin-top: 20px;
    height: 0px;
    width: auto;
}

.news {
    position: relative;
    width: 80%;
    margin-top: 3%;
    margin-left: 10%;
    margin-right: 10%;
}

section {
    display: block;

}

.info-message {
    max-width: 960px;
    margin: 60px auto 0;
    padding-bottom: 30px;
    background: rgb(214, 214, 214);
    width: 92%;
    opacity: 0.9;
}

.info-title {
    margin-top: 20px;
    border-bottom: 1px solid #ffffff;
    position: relative;
}

.info-title span {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    font-size: 18px;
    line-height: 60px;
    margin-left: 30px;
    color: #000000;
}

.item {
    margin-top: 16px;
    position: relative;
    padding-left: 30px;
}

.pup-bg {
    width: 100%;
    position: fixed;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 98;
    left: 0;
    top: 0;
    display: none;
}

.iconbg {
    padding: 0;
    height: 50%;
    background-position: top;
    background-repeat: no-repeat;
    background: #ffffff;
    background-image: url("../assets/home.svg");
    background-size: 10;
    margin-left: 11.6%;
    margin-right: 11.6%;
    opacity: 0.9;
}
</style>
