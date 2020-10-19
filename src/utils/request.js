import axios from "axios"
import qs from "qs"

import Vue from "vue"


import store from "../store"


//开发环境下使用
Vue.prototype.$imgurl = "http://localhost:3000"
let baseUrl = "/api";

// 打包
// Vue.prototype.$imgPre=""
// let baseUrl = "";

// 请求拦截  //请求拦截  后台 app.js 后端登录拦截打开
axios.interceptors.request.use(req => {

    // console.log(req,"req");
    if (req.url != baseUrl + "/api/userlogin") {
        req.headers.authorization = store.state.userinfo.token;
    }
    return req
})






//响应拦截
axios.interceptors.response.use((res) => {
    console.group("=====本次请求路径是:" + res.config.url)
    /**
     * 提示: 使用 console.group() 方法用于设置分组信息的起始位置。
     * 提示: 使用 console. groupCollapsed() 方法来设置折叠的分组信息。
     */
    console.log("res", res);
    console.log(res.data.list, "res.data.list");
    console.groupEnd()
    return res;
})




// **************菜单管理******************

// 菜单列表    读取数据
export const reqmenulist = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
// 菜单添加
export const reqmenuadd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(params)
    })
}

// 菜单删除 /api/menudelete  
export const reqMenudelete = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

// 菜单获取（一条） /api/menuinfo
export const reqMenuinfo = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id,
        }
    })
}
// 菜单修改
export const reqMenuedit = (params) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(params)
    })
}

// **************角色管理******************
// **1.角色添加** 
export const reqroleadd = (params) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(params)
    })
}

// **2.角色列表** 
export const reqrolelist = (params) => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}
// 5.角色删除

export const reqroledelete = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}
// 3.角色获取（一条）
export const reqroleinfo = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 4.角色修改
export const reqroleedit = (params) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(params)
    })
}

// **************角色管理******************
// **1.管理员添加** 
export const requseradd = (params) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(params)
    })
}
// **2.管理员总数（用于计算分页）**
export const requsercount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}
// **3.管理员列表（分页）**   params={page:1,size:10}
export const requserlist = (params) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: params
    })
}

// 4.管理员获取（一条）
export const requserinfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}


// 5.管理员修改
export const requseredit = (params) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(params)
    })
}

// 6.管理员删除
export const requserdelete = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({ uid: uid })
    })
}

// 7.管理员登录

export const requserlogin = (params) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(params)
    })
}


// **************商品分类******************
// **1.商品分类添加** 
export const reqcateadd = (params) => {
    let data = new FormData()
    /*data.append("pid", 1)
    data.append("cataanme", "123")
    data.append("img", File)
    data.append("status", 1)*/
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: data
    })
}

// **2.商品分类列表**    params={istree:true}  {pid:0}
export const reqcatelist = (params) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: params
    })
}
// 3.商品分类获取（一条）
export const reqcateinfo = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 4.商品分类修改
export const reqcateedit = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: data
    })
}
// 5.商品分类删除
export const reqcatedelete = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}


// **************商品规格管理******************
// 商品规格管理
export const reqspecsadd = (params) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(params)
    })
}

// 商品规格总数（用于计算分页）
export const reqspecscount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

// 商品规格列表（分页）
export const reqspecslist = (params) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: params
    })
}

// 商品规格获取（一条）
export const reqspecsinfo = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 商品规格修改
export const reqspecsedit = (params) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(params)
    })
}


// 商品规格删除
export const reqspecsdelete = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}

// *************商品管理*****************

// 商品添加
export const reqgoodsadd = (params) => {

    let data = new FormData()

    for (let i in params) {
        data.append(i, params[i])
    }

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: data
    })
}
// 商品总数（用于计算分页）
export const reqgoodscount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}

// 商品列表（分页）
export const reqgoodslist = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

// 商品获取（一条）
export const reqgoodsinfo = (params) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: params
    })
}
// 商品修改
export const reqgoodsedit = (params) => {

    let data = new FormData()

    for (let i in params) {
        data.append(i, params[i])
    }

    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: data
    })
}

// 商品删除
export const reqgoodsdelete = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}


// *************会员管理*****************
// 会员列表
export const reqmemberlist = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: "get",
    })
}

//会员获取（一条）
export const reqmemberinfo = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}

// 会员修改
export const reqmemberedit = (params) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(params)
    })
}


// *************轮播图管理*****************

// **1.轮播图添加** 
export const reqbanneradd = (params) => {
    let data = new FormData()
    /*data.append("pid", 1)
    data.append("cataanme", "123")
    data.append("img", File)
    data.append("status", 1)*/
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: data
    })
}

// **2.轮播图列表** **   
export const reqbannerlist = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}
// 3.轮播图获取（一条）
export const reqbannerinfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 4.轮播图修改
export const reqbanneredit = (params) => {
    let data = new FormData()
    for (let i in params) {
        data.append(i, params[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: "post",
        data: data
    })
}
// 5.轮播图删除
export const reqbannerdelete = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}




// *************秒杀管理*****************

// 限时秒杀添加 
export const reqseckadd = (data) => {

    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(data)
    })
}

// 限时秒杀列表 
export const reqsecklist = () => {
    return axios({
        url: baseUrl + "/api/secklist",
        method: "get",
    })
}


// 限时秒杀获取（一条）
export const reqseckinfo = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 限时秒杀修改
export const reqseckedit = (data) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(data)
    })
}

// 限时秒杀删除

export const reqseckdelete = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify({ id: id })
    })
}




