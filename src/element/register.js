import API from "../utils/API.js";

export default {
    methods: {
        register () {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    //此处需要调用后端的接口
                    var request = new XMLHttpRequest()
                    request.open(API.REGISTER.method, API.REGISTER.path, true)
                    request.send(JSON.stringify({
                        useraction: "register",
                        username : this.user.name,
                        userpass : this.user.pass,
                    }))
                    request.onreadystatechange = function () {
                        if (request.readyState === 4 && request.status === 200){
                            var registerSuccess = JSON.parse(request.response);
                            if (Boolean(registerSuccess) === true) {
                                this.$notify({
                                    type: 'success',
                                    message: '注册成功,用户名：' + this.user.name + '！',
                                    duration: 3000 
                                })
                                //页面跳转？
                                this.$router.replace('/')
                            } 
                            else {
                                this.$message({
                                    type: 'error',
                                    message: '该用户名已被注册！',
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