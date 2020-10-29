import API from "../utils/API.js"
import md5 from 'js-md5';
import {urlParam}  from "../utils/communication.js"

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
            this.$router.replace('/register')
        },
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    /*if (this.user.name === "admin" && this.user.pass === "123") {
                        this.$notify({
                            type: 'success',
                            message: '欢迎您,' + this.user.name + '！',
                            duration: 3000
                        })
                        this.$router.push({
                            name: 'Home',
                        });
                    }
                    */
                    //此处需要调用后端的接口

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
                    request.send(null)
                    
                } else {
                    return false
                }
            })
        }

    },
}