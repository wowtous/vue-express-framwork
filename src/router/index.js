import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import Home from '../views/Home.vue'

export default new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: LoginView },
        { path: '/signup', component: SignupView },
        { path: '/home', component: Home, redirect: '/login', children: [] }
    ]
})
