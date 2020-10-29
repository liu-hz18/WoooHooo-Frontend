import API from "../utils/API.js";
import md5 from 'js-md5';

export default {
    methods: {
        register () {
            
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    //此处需要调用后端的接口
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
                    }))
                    //console.log("发送：")
                    //console.log()
                }
                else {
                    return false
                }
            })
        },
        
        getvalidation() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    console.log('请求中')
                    //发送邮件
                    //改变按钮显示
                    
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
                    {required: true, message: '邮箱不能为空', trigger: 'blur'}
                ],
                pass: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
                validation: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ]
            }
        }
    }
}