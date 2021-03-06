import { reqmemberlist } from '../../utils/request'


const state = {
    // 会员管理中的list
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
    reqListActions(context){
        //发请求
        reqmemberlist().then((res)=>{
            context.commit("changList",res.data.list)
        })
    }
}

const getters = {
    list(state){
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