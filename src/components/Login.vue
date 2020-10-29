<template>
<div class="loginbg">

    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;opacity: 0.85;justify-content: center">
        <el-card style="width: 400px;margin-top: 150px">
            <div slot="header" class="clearfix">
                <span style = "font-size: 25px;">登录</span>
            </div>
            <p style="margin-top: 0px">
                    暂不登录？
                    <span id = "login_btn">
                      <a href="/home">
                      访客模式
                      </a>
                    </span>
                  </p>
            <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
                
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input v-model="user.pass" type="password"></el-input>
                </el-form-item>
                <el-row type="flex" class="row-bg" justify="space-around">
                    <el-button icon="el-icon-user" @click="register" round>注册</el-button>
                    <el-button type="primary" icon="el-icon-user-solid" @click="login" round>登录</el-button>
                </el-row>
            </el-form>

        </el-card>
    </div>
</div>
</template>

<script src="../datas/login.js">
</script>

<style>
.el-row {
    margin-top: 20px;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 0px;
}

.loginbg {
    padding: 0;
    margin: 0;
    height: 100vh;
    background: #99a9bf;
    background-image: url("../assets/bg.jpg");
    background-size: cover;
}
</style>
