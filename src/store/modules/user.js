
//       总数  列表
import { requsercount, requserlist } from '../../utils/request'


const state = {
    // 管理员管理中的list
    list: [],
    // 查询条数
    size: 2,
    //总数
    total: 0,
    //页码
    page: 1,
}

const mutations = {
    // 修改list
    changList(state, arr) {
        state.list = arr
    },

    //总数的修改
    changtotal(state, num) {
        state.total = num
    },
    //修改页码
    changepage(state, page) {
        state.page = page
    }

}

const actions = {
    // 页面请求
    reqListActions(context) {
        //发请求
        requserlist({ size: context.state.size, page: context.state.page }).then((res) => {
            //如果去list的时候，取到null,那么有可能是最后一页没数据了，需要减一页，再次请求list
            let list = res.data.list ? res.data.list : []

            //如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
            if (context.state.page > 1 && list.length == 0) {
                context.commit("changepage", context.state.page - 1)
                context.dispatch("reqListActions")
                return
            }
            context.commit("changList", list)
        })
    },
    //获取总数的请求
    reqtotalActions(context) {
        requsercount().then((res) => {
            context.commit("changtotal", res.data.list[0].total)
        })
    },
    //组件修改了页码
    changePageAction(context, page) {
        //修改页码
        context.commit("changepage", page)
        //发起list请求
        context.dispatch('reqListActions')
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true

}