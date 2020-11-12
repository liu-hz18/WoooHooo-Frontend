<template>
    <div class="registerbg"> 

      <!--flex弹性盒子模型，justify-content：主抽 -->
      <div class="reg-dialog" style="display: flex;justify-content: center;opacity: 0.85;border-radius: 96px;" >
        <el-card style="width: 400px;margin-top: 150px">
          <div slot="header" class="clearfix">
            <span style = "font-size: 25px;">欢迎注册</span>
          </div>
          <el-form ref="registerForm" :model="user" :rules="rules" status-icon label-width="80px">
                  <p style="margin-top: 0px">
                    已有账号？
                    <span id = "login_btn" @click="login">
                      <a style="color: #4283b9;cursor: pointer;" >
                      登录
                      </a>
                    </span>
                  </p>
              
              <el-form-item label="用户名" prop="name" style="margin-right:28px;">
                  <el-input v-model="user.name" ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email" style="margin-right:28px;">
                  <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass" style="margin-right:28px;">
                  <el-input v-model="user.pass" type="password"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="validation">
                    <el-col :span="14"><el-input v-model="user.validation" ></el-input></el-col>
                    <el-col :span="10"><el-button icon="el-icon-message" @click="getvalidation" >获取</el-button></el-col>
              </el-form-item>
              <el-row type="flex" class="row-bg" justify="space-around">
                  <el-button class="registerbutton" icon="el-icon-user" @click="register" round>注册</el-button>
              </el-row>
          </el-form>
          
        </el-card>
        <LoginDialog v-bind:dialogVisible= "this.loginDialog.visible" v-on:loginsuccess = "jhome" v-on:register = "closeLoginDia"/>
      </div>
      
    </div>
</template>
 
<script src="../datas/register.js">
</script>

<style>
html, body {
  margin: 0px 0px 0px 0px;
  width: 100%;
  height: 100%;
}

.registerbg {
    position: fixed;
    background-image: url("../assets/pexels-krivec-ales-547115.jpg");
    background-position: center;
    -webkit-font-smoothing: antialiased;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    z-index: 0;
    opacity: 0.8;
}

.el-card {
    position: relative;
    z-index: 100;
    opacity: 1.0;
}

.registerbutton{
    width: 300px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #777777;
    border-radius: 24px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    font-weight: Normal;
    text-align: center;
    color: #777777;
    line-height: 20px;
}

</style>