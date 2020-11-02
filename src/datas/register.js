import API from "../utils/API.js";
import md5 from 'js-md5';
import {vaildateEmail,urlParam}  from "../utils/communication.js"


export default {
    methods: {
        register () {
            
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    //此处调用后端的接口
                    var parent = this;
                    var request = new XMLHttpRequest()
                    request.open(API.UPDATE_USER_INFO.method, API.UPDATE_USER_INFO.path, false)
                    request.onreadystatechange = function () {
                        console.log("从后端收到：")
                        console.log(request.readyState, request.status, request.responseText)
                        if (request.readyState === 4 ){
                            if(request.status === 200){
                                parent.$notify({
                                    type: 'success',
                                    message: '注册成功,用户名：' + parent.user.name + '！',
                                    duration: 3000 
                                })
                                //页面跳转
                                parent.$router.replace('/login')
                            }
                            else if(request.status === 401){
                                parent.$message({
                                    type: 'error',
                                    message: '该用户名已被注册！',
                                    showClose: true
                                })
                            }
                            else{
                                parent.$message({
                                    type: 'error',
                                    message: '未知错误，请重试！',
                                    showClose: true
                                })
                            }
                        }
                        else if (this.readyState === 1) {
                            console.log('请求中')
                        } 
                        else {
                            
                            console.log('请求失败')
                        }
                    }
                    request.send(JSON.stringify({
                        useraction: "register",
                        username : this.user.name,
                        userpass : md5(this.user.pass),
                        useremail : this.user.email,
                        uservalidation: this.user.vaildation === null? "": this.user.vaildation
                    }))
                }
                else {
                    return false
                }
            })
        },
        
        getvalidation() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    
                    //给后端发送邮箱
                    //改变按钮显示
                    console.log('向邮箱发送验证码')
                    var request = new XMLHttpRequest()
                    var url = urlParam(API.SEND_USER_EMAIL.path, {
                        useraction: "login",
                        username: this.user.name,
                        userpass: md5(this.user.pass),
                        useremail : this.user.email
                    })
                    request.open(API.SEND_USER_EMAIL.method, url, false)

                    request.onreadystatechange = function () {
                        console.log("从后端收到：")
                        console.log(request.readyState, request.status, request.responseText)

                    }
                    request.send(null)
                }
                else {
                    return false
                }
            })
            
        }
    },
    data () {
        return {
            user: {},
            rules: {
                name: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '邮箱不能为空', trigger: 'blur'},
                    {
                        validator:vaildateEmail,
                        message: '邮箱格式错误',
                        trigger: 'blur'
                        }
                ],
                pass: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {min:8, message:'密码不能少于8个字符',trigger: 'blur'}
                ]
            },
            

        }
    }
}