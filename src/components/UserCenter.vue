<template>
<div class="center">
    <el-container>
        <el-header>
            <NavBar v-bind:activeIndexProp="activeIndexProp" :username = "userstate.username" @user-logout = "userLogout"> </NavBar>
        </el-header>

        <el-row :gutter="20">
            <el-col :span="4" :offset="11">
                <div class="home-icon">
                    <img v-bind:src="homeicon" alt="WooHoo~" />
                </div>
            </el-col>
        </el-row>
    </el-container>

    <div class="clear-space">
        <section class="info-message">
            <div class="info-title">
                <span class="active">账号信息</span>
            </div>
            <el-form >
                <el-form-item label="用户名" class="item">
                        <span style="color: #000000;">David</span>
                </el-form-item>
                <el-form-item label="注册邮箱" class="item">
                        <span style="color: #000000;">xxx@xx.xx</span>
                </el-form-item>
                <el-form-item label="密码" class="item">
                        <span style="color: #42b983;" @click="handleRstPass">重置密码</span>
                </el-form-item>
            </el-form>
        </section>
        <section class="info-message info-message2" id="my-object">
            <div class="info-title">
                <span class="active">历史足迹</span>
            </div>
            
        </section>
        <div class="pup-bg">
            <!--    重设密码弹框-->
            <div class="my-info-pup reset-password" id="reset-password-pup" style="display: block;">
                <div class="my-info-warp">
                    <div class="close iconfont icon_demo_close">

                    </div>
                    <h6>重设密码</h6>
                <div class="list">
                    <span>原密码</span>
                    <input id="oldPwd" type="password" class="text" placeholder="原密码" data-error="密码长度为6-20">
                </div>
                <div class="list">
                    <span>新密码</span>
                    <input id="newPwd" type="password" class="text" placeholder="新密码" data-error="密码长度为6-20">
                </div>
                <div class="list">
                    <span>重复新密码</span>
                    <input id="confPwd" type="password" class="text" placeholder="确认新密码" data-error="两次输入密码不一致">
                </div>
                <p class="error-message">密码长度为6-20</p>
                <div class="button-warp">
                    <button data-text="重置密码成功" class="ok" id="submitPwd">确定</button>
                    <button class="cancel">取消</button>
                </div>
                </div>
            </div>
        </div>
        
        
        <!--    产品偏好设置-->
            
        <!--    重命名昵称-->
            
        <!--   密码保护 -->
            
    </div>

</div>
</template>

<script>
import {
    getNewsClassList
} from "../datas/newslist.js";
import logo from "../assets/search_icon.png";
import NavBar from "./NavBar.vue";

export default {
    name: "Home",
    components: {
        NavBar,
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
                //username:this.$route.params.username?this.$route.params.username:""
                username:this.$cookies.get("username")?this.$cookies.get("username"):""
            },
            activeIndexProp:"1"
            
        };
    },
    computed: {},
    methods: {
        handleClick() {
            getNewsClassList(this.activeTab, this.pageNumber, 10, this);
        },
        userLogout(){
            this.$cookies.remove("username")
            this.userstate.username = ""
        },
        handleRstPass(){

        }
    },
    created() {
        getNewsClassList(this.activeTab, 0, 10, this);
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
    color: #42b983;
}

.home-icon {
    margin-top: 20px;
    height: 100px;
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

</style>
