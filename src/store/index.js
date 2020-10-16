import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import { state, getters, mutations } from "./mutations"
import { actions } from "./actions"
// 
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'

import specs from './modules/specs'

import goods from './modules/goods'
// 
import member from './modules/member'



// 
export default new Vuex.Store({
    // 存放数据
    state,
    // Getter 还会将 store.getters 对象暴露出去，你可以以属性的形式访问这些值：
    getters,
    // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
    mutations,
    // 1、Action 提交的是 mutation，而不是直接变更状态。
    // 2、Action 可以包含任意异步操作。
    actions,

    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        goods,
        member,
    }
})