<template>
<div >
    <el-container>
        <el-header>
            <NavBar v-bind:activeIndexProp="activeIndexProp" :username = "userstate.username" @user-logout = "userLogout"> </NavBar>
        </el-header>

        
    </el-container>

    <div >
        <section class="info-message" >
            <div class="info-title">
                <span class="active">账号信息</span>
            </div>
            <el-form >
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
        <RstPassDialog v-bind:oldpass = "rstPassDialog.form.oldpass"
                        v-bind:newpass= "rstPassDialog.form.newpass"
                        v-bind:dialogVisible= "rstPassDialog.visible"
                        @canclebtn = "closedialog"
                        @rstpass="rstpass"
                        />
        <div class="pup-bg">
            <!--    重设密码弹框-->
            
        </div>
        
        
        <!--    产品偏好设置-->
            
        <!--    重命名昵称-->
            
        <!--   密码保护 -->
            
    </div>

</div>
</template>

<script>
import {getBrowseNewsList} from "../datas/newslist.js";
import logo from "../assets/home.svg";
import NavBar from "./NavBar.vue";
import NewsList from "./NewsList.vue";
import RstPassDialog from "@/components/RstPassDialog"

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
            userstate:{
                username:this.$cookies.get("username")?this.$cookies.get("username"):""
            },
            userinfo:{
                mail:"xxx@xx.com"
            },
            newsInfo: {
                data: [],
                time: 0.0001,
                total: 1000,
                keywords: [],
            },
            activeIndexProp:"1",
            rstPassDialog:{
                visible:false,
                  form:{
                      oldpass:"",
                      newpass:""
                    }
                },
            
        };
    },
    computed: {},
    methods: {
        
        
        userLogout(){
            this.$cookies.remove("username")
            this.userstate.username = ""
        },
        handleRstPass(){
            console.log("修改密码")
            this.rstPassDialog.visible = true
        },
        closedialog(){
            this.rstPassDialog.visible = false
        },
        rstpass(){
            this.rstPassDialog.visible = false
            this.$message({
                type: 'success',
                message: '密码修改成功！',
                showClose: true
            })
        }
    },
    created() {
        console.log("个人中心页面加载中")
        getBrowseNewsList(this.userstate.username,this);
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
    background-repeat:no-repeat;
    background: #ffffff;
    background-image: url("../assets/home.svg");
    background-size: 10;
    margin-left: 11.6%;
    margin-right: 11.6%;
    opacity: 0.9;
}

</style>
