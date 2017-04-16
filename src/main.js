import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import App from './App'
import 'element-ui/lib/theme-default/index.css'
import router from './router'

Vue.use(VueResource)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router
})
