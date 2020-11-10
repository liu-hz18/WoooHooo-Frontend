import API from "../utils/API.js";
import md5 from 'js-md5';
import {vaildateEmail}  from "../utils/communication.js"
import LoginDialog from "@/components/LoginDialog"

export default {
    components: {
        LoginDialog,
    },

    methods: {
        login(){
            this.loginDialog.visible = true;
        },
        jhome(){
            this.$router.replace('/home')
        },
        closeLoginDia(){
            this.loginDialog.visible = false;
        },
        register () {
            
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    if( md5(this.user.validation) === this.validationcode){
                        console.log(md5(this.user.validation) +"=="+ this.validationcode)
                        console.log("验证成功")
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
                                    //页面跳转->改为跳转回主页面
                                    parent.$router.replace('/home')
                                    parent.$cookies.set("username", parent.user.name)
                                }
                                else if(request.status === 400){
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
                            mail : this.user.email,
                            
                        }))
                    }
                    else{
                        console.log(this.user.validation +"!="+ this.validationcode)
                        console.log("验证失败")
                        this.$message({
                            type: 'error',
                            message: '验证码错误！',
                            showClose: true
                        })
                    }
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
                    var parent = this
                    request.open(API.SEND_USER_EMAIL.method,API.SEND_USER_EMAIL.path, false)
                    var VC;
                    request.onreadystatechange = function () {
                        parent.$message({
                            type: 'success',
                            message: '验证码已发送',
                            showClose: true
                        })
                        console.log("从后端收到：")
                        console.log(request.readyState, request.status, request.responseText)
                        var jsonobj = JSON.parse(request.responseText);
                        VC = jsonobj["data"];
                        console.log("validationcode =" + VC)
                    }
                    request.send(JSON.stringify({
                        username : this.user.name,
                        mail : this.user.email,
                    }))
                    this.validationcode = VC;
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
            loginDialog:{
                visible:false,
            },
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
                ],
                validation:[]
            },
            validationcode:"sssss"
            

        }
    }
}