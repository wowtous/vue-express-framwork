<template>
<div>
    <div class="signup-form">
        <div class="title">vue-framwork</div>
        <el-input v-model="form.companyName" placeholder="公司名" size="large"></el-input>
        <el-input v-model="form.userName" placeholder="手机号" size="large"></el-input>
        <el-input v-model="form.password" type="password" placeholder="密码" size="large"></el-input>
        <el-button type="primary" @click="signup" size="large">注册</el-button>
        <div class="no-account">
            已经有帐号？
            <router-link to="/login">直接登录</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                companyName: null,
                userName: null,
                password: null
            }
        }
    },
    methods: {
        signup() {
            // let form = {userName: this.name, password: this.password}
            this.$http.post('/api/signup', this.form).then(
                response => {
                    if (response.body.error === 200) {
                        // this.$emit('submitted')
                        this.$message.success('注册成功')
                        this.$router.push('/')
                    } else {
                        this.$message.error(response.body.errorMsg)
                    }
                }
            ).catch(response => this.$message.error(response))
        }
    }
}
</script>

<style scoped>
.signup-form {
    margin: 200px auto;
    text-align: center;
}

.title {
    font-size: 35px;
    margin: 30px;
    font-weight: bold;
}

.el-input {
    margin: 25px auto;
    width: 300px;
    display: block;
}

.el-button {
    width: 300px;
    margin-bottom: 20px;
    height: 42px;
}

.no-account {
    color: #A6A6A6;
}

a {
    color: #20A0FF;
    text-decoration: none;
}
</style>
