<template>
    <Layout>
        <template v-slot:main>
            <!-- <div class="login-title">火车票售票系统</div> -->
            <div style="display: flex; justify-content: center; align-items: center; margin-top: 100px;">
                <el-form
                    ref="loginForm"
                    :model="loginForm"
                    status-icon
                    :rules="rules"
                    label-width="120px"
                    style="width: 400px;"
                >
                    <el-form-item label="用户" prop="username" required>
                        <el-input v-model="loginForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="userpwd" required>
                        <el-input
                            v-model="loginForm.userpwd"
                            type="password"
                            autocomplete="off"
                            show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('loginForm')"
                            style="width: 100%;"
                        >登陆</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </Layout>
</template>
<script>
import { ElMessage } from 'element-plus'
import Layout from '../views/Layout.vue';

export default {
     name: 'TrainLogin',
    data() {
        return {
            loginForm: {
                username: '',
                userpwd: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                userpwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const apicall = require('../assets/js/apicall').default
                    const formData = new FormData();
                    formData.append("mobile",this.loginForm.username)
                    formData.append("password",this.loginForm.userpwd)
                    apicall.fetch('/user/doSignIn',apicall.POST,formData)
                    .then((res) => {
                        //this.$store.commit('login', this.loginForm.username)
                        console.log("result",res)
                        ElMessage({
                            showClose: true,
                            message: "cess",
                            type: 'success',
                        })
                        this.$router.replace({ name: 'Home' })
                    })
                    .catch((err) => {
                        console.log("err",err)
                        ElMessage({
                            showClose: true,
                            message: err,
                            type: 'sucess',
                        })
                    });
                    
                  
                    
                    
                } else {
                    return false
                }
            })
        }
    },
    components: {
        Layout
    }
}
</script>
