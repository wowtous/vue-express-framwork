import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    temp: {
        businessTypeId: null,
        brandId: null
    },
    navData: [],
    userName: '',
    shopIds: [],
    roleId: 0,
    isLoggedIn: false
}
const getters = {
    navBarList: state => {
        let list = []
        for (let item of state.navData) {
            // 如果cat在list中不存在，则push，存在则在其child里push name url
            let index = list.findIndex(i => i.cat === item.cat)
            if (index === -1) {
                list.push({
                    cat: item.cat,
                    child: [{
                        name: item.name,
                        url: item.url
                    }]
                })
            } else {
                list[index].child.push({
                    name: item.name,
                    url: item.url
                })
            }
        }
        return list
    }
}
const mutations = {
    saveNavData(state, data) {
        state.navData = data
    },
    saveUserInfo(state, data) {
        // state.userInfo = data
        state.userName = data.name
        state.shopIds = data.shopIds
        state.roleId = data.roleId
    },
    login(state) {
        state.isLoggedIn = true
    },
    logout(state) {
        state.isLoggedIn = false
    }
}
const actions = {
    // fetchNavData: ({ commit }) => {
    //   Vue.prototype.$get('/api/modules', data => {
    //     commit('saveNavData', data)
    //   })
    // },
    // fetchUserInfo: ({ commit }) => {
    //   Vue.prototype.$get('/api/profile', data => {
    //     commit('saveUserInfo', data)
    //     commit('login')
    //   })
    // }
}
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
