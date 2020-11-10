<template>
  <el-dialog
        style="text-align: center"
        title="登录"
        :visible="dialogVisible"
        :modal-append-to-body='false'
        :show-close=false
        width="40%">

        <!--flex弹性盒子模型，justify-content：主抽 -->
    
            <div slot="header" class="clearfix">
                <span style="font-size: 25px;">登录</span>
            </div>
            <p style="margin-top: 0px">
                暂不登录？
                <span id="login_btn">
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
        

  </el-dialog>
</template>

<script >
import API from "../utils/API.js"
import md5 from 'js-md5';
import {urlParam}  from "../utils/communication.js"

export default {
  name: "LoginDialog",
  props: {
      dialogVisible: {
            type: Boolean,
            default: () => true
        },
  },
  // 请在下方设计自己的数据结构以及事件函数
  data(){
    return {
        user: {},
            rules: {
                name: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }],
                pass: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }]
            }
    }
  },
  methods: {
        register() {
            this.$emit("register",)
        },
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    //此处调用后端的接口
                    var parent = this;
                    var request = new XMLHttpRequest()
                    var url = urlParam(API.CHECK_USER_INFO.path, {
                        useraction: "login",
                        username: this.user.name,
                        userpass: md5(this.user.pass),
                    })
                    console.log("访问后端")
                    console.log(url)
                    request.open(API.CHECK_USER_INFO.method, url, false)
                    request.onreadystatechange = function () {
                        console.log("从后端收到：")
                        console.log(request.readyState, request.status, request.responseText)
                        if (request.readyState === 4) {
                            if(request.status === 200){
                                var loginSuccess = JSON.parse(request.response);
                                if (Boolean(loginSuccess) === true) {
                                    parent.$notify({
                                        type: 'success',
                                        message: '欢迎您，' + parent.user.name + '！',
                                        duration: 3000
                                    })
                                    //页面跳转
                                    console.log("登录成功，跳转主页面")
                                    parent.$cookies.set("username", parent.user.name)
                                    //parent.$forceUpdate()
                                    parent.$emit("loginsuccess",parent.user.name)
                                    //修改用户状态
                                    //parent.$emit("userLogin",parent.user.name)
                                }
                            }
                            else if(request.status === 400){
                            parent.$message({
                                type: 'error',
                                message: '用户名或密码错误',
                                showClose: true
                            })
                        }
                        } else if (this.readyState === 1) {
                            console.log('请求中')
                        } else {
                            console.log('请求失败')
                        }
                    }
                    request.send(null)
                    
                } else {
                    return false
                }
            })
        }

    },
  
  
}
</script>