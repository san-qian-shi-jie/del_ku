<template>
  <div class="login">
    <div class="box">
      <div class="center line">
        <h2>登录页面</h2>
      </div>

      <div class="center line">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </div>

      <div class="center line">
        <el-input
          placeholder="请输入密码"
          v-model="user.password"
          show-password
        ></el-input>
      </div>

      <div class="center line">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// 弹出的提示框
import { successAlert, warningAlert } from "../../utils/alert";
//
import { requserlogin } from "../../utils/request";

export default {
  //接收子组件的传参
  props: [],
  // 计算属性
  components: {},
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    login() {
      //
      //
      requserlogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(data.list.msg);
          this.$router.push("/");
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
.box {
  width: 500px;
  /* height: 200px; */
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.center {
  text-align: center;
}
.line {
  margin-top: 20px;
}
</style>