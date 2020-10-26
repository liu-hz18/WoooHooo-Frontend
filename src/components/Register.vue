<template>
    <div class="registerbg"> 
      
      <!--flex弹性盒子模型，justify-content：主抽 -->
      <div style="display: flex;justify-content: center;opacity: 0.85;border-radius: 96px;" >
        <el-card style="width: 400px;margin-top: 150px">
          <div slot="header" class="clearfix">
            <span style = "font-size: 25px;">欢迎注册</span>
          </div>
          <el-form ref="registerForm" :model="user" :rules="rules" status-icon label-width="80px">
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
                    <el-col :span="14"><el-input v-model="user.validation"></el-input></el-col>
                    <el-col :span="10"><el-button icon="el-icon-message" @click="getvalidation" v-model="validationbutton">获取</el-button></el-col>
                  
              </el-form-item>
              <el-row type="flex" class="row-bg" justify="space-around">
                  <el-button icon="el-icon-user" @click="register" round class="registerbutton">注册</el-button>
              </el-row>
          </el-form>
          
        </el-card>
      </div>
    </div>
</template>
 
<script src="../datas/register.js">
</script>

<style>
  .registerbg {
    padding: 0;
    margin: 0;
    height: 100vh;
    background: #99a9bf;
    background-image: url("../assets/green.jpg");
    background-size: cover;
  }


.registerbutton{
    width: 400px;
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