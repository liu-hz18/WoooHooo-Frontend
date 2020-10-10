<template>
<div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 150px">
        <el-card style="width: 400px">
            <div slot="header" class="clearfix">
                <span>登录</span>
            </div>
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

<script>
import API from "../utils/API.js"

export default {
    data() {
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
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    //此处需要调用后端的接口
                    var request = new XMLHttpRequest()
                    request.open(API.UPDATE_USER_INFO.method, API.UPDATE_USER_INFO.path, true)

                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            var registerSuccess = JSON.parse(request.response);
                            if (Boolean(registerSuccess) === true) {
                                this.$notify({
                                    type: 'success',
                                    message: '注册成功,用户名：' + this.user.name + '！',
                                    duration: 3000
                                })
                                //页面跳转？
                                this.$router.push({
                                    name: 'Home',
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '该用户名已被注册！',
                                    showClose: true
                                })
                            }
                        } else if (this.readyState === 1) {
                            console.log('请求中')
                        } else {
                            console.log('请求失败')
                        }
                    }
                    request.send(JSON.stringify({
                        useraction: "register",
                        username: this.user.name,
                        userpass: this.user.pass,
                    }))
                } else {
                    return false
                }
            })
        },
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    //此处需要调用后端的接口
                    var request = new XMLHttpRequest()
                    request.open(API.CHECK_USER_INFO.method, API.CHECK_USER_INFO.path, true)
                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200) {
                            var loginSuccess = JSON.parse(request.response);
                            if (Boolean(loginSuccess) === true) {
                                this.$notify({
                                    type: 'success',
                                    message: '欢迎您,' + this.user.name + '！',
                                    duration: 3000
                                })
                                //页面跳转？
                                this.$router.push({
                                    name: 'Home',
                                });
                            } else {
                                this.$message({
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
                    request.send(JSON.stringify({
                        useraction: "login",
                        username: this.user.name,
                        userpass: this.user.pass,
                    }))
                } else {
                    return false
                }
            })
        }

    },
}
</script>

<style>
.el-row {
    margin-top: 20px;
    margin-left: 40px;
    margin-right: 40px;

    &:last-child {
        margin-bottom: 0;
    }
}
</style>
