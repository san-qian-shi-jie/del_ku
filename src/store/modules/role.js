import { reqrolelist } from '../../utils/request'


const state = {
    // 菜单管理中的list
    list: []
}

const mutations = {
    // 修改list
    changList(state, arr) {
        state.list = arr
    }

}

const actions = {
    // 页面请求
    reqListActions(context) {
        //发请求
        reqrolelist().then((res) => {
            let list = res.data.list ? res.data.list : []
            context.commit("changList", list)
        })
    }
}

const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true

}