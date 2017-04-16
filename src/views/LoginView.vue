<template>
<div id="Login">
    <div class="login-form">
        <div class="title">vue-framwork</div>
        <el-input v-model="form.userName" placeholder="用户名" size="large"></el-input>
        <el-input v-model="form.password" type="password" placeholder="密码" size="large"></el-input>
        <el-button type="primary" @click="login" size="large">登录</el-button>
        <div class="no-account">
            还没有帐号？
            <router-link to="/signup">注册新帐号</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                userName: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            // let form = {userName: this.name, password: this.password}
            this.$http.post('/api/login', this.form).then(
                response => {
                    if (response.body.error === 200) {
                        // this.$emit('submitted')
                        this.$message.success('登录成功')
                        this.$store.commit('saveUserInfo', response.body.data)
                        // this.$router.push({ path: '/home', meta: {username: 'hawk'} })
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
/*#login {
  height: 200px;
}*/

.login-form {
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
