<template>
<div>
    <div class="header">
        <div class="logo">
            <router-link to="/" exact>
                <img src="../assets/logo.png" with="120px" height="60px" alt="logo">
            </router-link>
        </div>
        <el-menu class="menu" default-active="0" :unique-opened="true" :router="true" mode="horizontal">
            <el-submenu v-for="(value, index) in $store.getters.navBarList" :index="index.toString()">
                <template slot="title">{{value.cat}}</template>
                <el-menu-item :index="subvalue.url" v-for="subvalue in value.child">{{subvalue.name}}</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="user">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
            {{ userName }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="modifyPWD">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>

    <div class="content">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title[0]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title[1]}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view v-if="this.$store.state.isLoggedIn">
        </router-view>
    </div>
    <el-dialog size="tiny" title="修改密码" v-model="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="原密码" :label-width="formLabelWidth">
                <el-input v-model="form.pwdBefore" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="form.pwdNow" type="password" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
// import _ from 'lodash'
export default {
    name: 'app',
    data() {
        return {
            dialogFormVisible: false,
            form: {},
            formLabelWidth: '70px',
            rawNavList: null,
            navlist: {},
            title: []
        }
    },
    // beforeRouteEnter(to, from, next) {
    //     let i = 5
    //     if (i > 3) {
    //         next(console.log(to, from, next))
    //     } else {
    //         next(vm => {
    //             console.log(vm)
    //         })
    //     }
    // },
    created() {
        // this.$store.dispatch('fetchNavData')
        // this.$store.dispatch('fetchUserInfo')
        this.$get('/api/profile', data => {
            // console.log(data)
            this.$store.commit('saveUserInfo', data)
            this.$store.commit('login')
        })
        this.$get('/api/modules', data => {
            this.$store.commit('saveNavData', data)
        })
    },
    computed: {
        userName() {
            return this.$store.state.userName
        }
    },
    methods: {
        handleSelect(key) {
            // console.log(this.rawNavList)
            this.rawNavList.forEach(item => {
                if (item.url === key) {
                    this.title[0] = item.cat
                    this.title[1] = item.name
                }
            })
        },
        handleCommand(command) {
            if (command === 'logout') {
                this.$http.delete('/api/login').then(
                    res => {
                        if (res.body.error === 200) {
                            this.$router.push('/login')
                            this.$store.commit('logout')
                            // this.$destroy()
                        } else {
                            this.$message.error(res.body.errorMsg)
                        }
                    }
                ).catch(res => this.$message.error(res))
            } else if (command === 'modifyPWD') {
                this.dialogFormVisible = true
                this.form = {}
            }
        }
    }
}
</script>

<style scoped>
.header {
    position: fixed;
    top: 0px;
    z-index: 100;
    height: 60px;
    width: 100%;
    background-color: #eff2f7;
    box-shadow: 0 -1px 8px 1px #bbb;
}

.logo {
    float: left;
    /*margin-top: 6px;*/
}

.menu {
    display: inline-block;
}

.user {
    float: right;
    margin-top: 22px;
    margin-right: 20px;
    cursor: pointer;
}

.content {
    margin-top: 60px;
    padding: 20px;
}

.el-breadcrumb {
    margin-bottom: 20px;
}

.el-input {
    width: 194px;
}

.dialog-footer {
    margin-top: -30px;
}
</style>
