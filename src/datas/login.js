import API from "../utils/API.js"
import md5 from 'js-md5';
import {urlParam}  from "../utils/communication.js"
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

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
                                    parent.$router.push({
                                        name: 'Home',
                                        params: {
                                            username: parent.user.name
                                        }
                                    });
                                    parent.$cookies.set("username", parent.user.name)
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