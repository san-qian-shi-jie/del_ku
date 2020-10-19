<template>
  <div>
    <el-container class="index">
      <el-aside width="200px" class="left">
        <!-- Aside -->
        <!-- 1.background-color 背景颜色 
          2.router 开启路由模式,index 是你想要跳转的路径
          3.unique-opened 保持只有一个子菜单展开
      -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!-- 动态侧边栏 -->

          <div v-for="item in userinfo.menus" :key="item.id">
            <!-- 是目录 -->
            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                  >{{ i.title }}</el-menu-item 
                >
              </el-menu-item-group>
            </el-submenu>
            <!--  -->

            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{
              item.title
            }}</el-menu-item>
          </div>

          <!-- <hr />
          <hr />
          <hr /> -->
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="role">角色管理</el-menu-item>
              <el-menu-item index="manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-submenu> -->
        </el-menu>
        <!-- Aside -->
      </el-aside>
      <!-- =======头部+内容======= -->
      <el-container>
        <el-header class="header">
          <div class="header-con">
            <h3>{{ userinfo.username }}</h3>
            <el-button type="danger" @click="logOut()">退出登录</el-button>
          </div>
        </el-header>

        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- Main -->
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  methods: {
    ...mapActions({
      changeuserinfoActions: "changeuserinfoActions",
    }),

    logOut() {
      this.changeuserinfoActions({});
      this.$router.push("/login");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.con {
  padding-top: 20px;
}
.index {
  height: 100vh;
}
.header {
  background-color: #b3c0d1;
}
.left {
  background-color: #20222a;
}

.header-con {
  float: right;
}
.header-con h3 {
  float: left;
  line-height: 60px;
  font-weight: 400;
}
.header-con .el-button {
  float: left;
  margin-top: 10px;
}
</style>