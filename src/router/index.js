import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export const indexRouters = [
  {
    path: 'menu',
    name: "菜单管理",
    component: () => import("../pages/menu/menu")
  },
  {
    path: 'role',
    name: "角色管理",
    component: () => import("../pages/role/role")
  },
  {
    path: 'manage',
    name: "管理员管理",
    component: () => import("../pages/manage/manage")
  },
  {
    path: 'cate',
    name: "商品分类",
    component: () => import("../pages/cate/cate")
  },
  {
    path: 'specs',
    name: "商品规格",
    component: () => import("../pages/specs/specs")
  },
  {
    path: 'goods',
    name: "商品管理",
    component: () => import("../pages/goods/goods")
  },

  {
    path: 'member',
    name: "会员管理",
    component: () => import("../pages/member/member")
  },
  {
    path: 'banner',
    name: "轮播图管理",
    component: () => import("../pages/banner/banner")
  },
  {
    path: 'seckill',
    name: "秒杀活动",
    component: () => import("../pages/seckill/seckill")
  },
]


export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: () => import("../pages/login/login")
    },
    {
      path: '/',
      component: () => import("../pages/index/index"),
      children: [
        {
          path: '',
          component: () => import("../pages/home/home")
        },
        ...indexRouters

        /*
         * {
          path: 'menu',
          name: "菜单管理",
          component: () => import("../pages/menu/menu")
        },
        {
          path: 'role',
          name: "角色管理",
          component: () => import("../pages/role/role")
        },
        {
          path: 'manage',
          name: "管理员管理",
          component: () => import("../pages/manage/manage")
        },
        {
          path: 'cate',
          name: "商品分类",
          component: () => import("../pages/cate/cate")
        },
        {
          path: 'specs',
          name: "商品规格",
          component: () => import("../pages/specs/specs")
        },
        {
          path: 'goods',
          name: "商品管理",
          component: () => import("../pages/goods/goods")
        },

        {
          path: 'member',
          name: "会员管理",
          component: () => import("../pages/member/member")
        },
        {
          path: 'banner',
          name: "轮播图管理",
          component: () => import("../pages/banner/banner")
        },
        {
          path: 'seckill',
          name: "秒杀活动",
          component: () => import("../pages/seckill/seckill")
        },
         */
        

      ]
    }
  ]
})
