<template>
  <div>
    <h1>登录</h1>
    <el-dialog title="会员修改" :visible.sync="info.isshow" @closed="close">
      <el-form ref="form" :model="form" label-width="80px">
        <!--  -->
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!--  -->
      </el-form>
      <!--  -->
      <div slot="footer" class="dialog-footer">
        <!--  -->
        <el-button type="primary" @click="toEdit">修改</el-button>

        <el-button @click="cencal">取消</el-button>
      </div>
      <!--  -->
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import {
  requseradd,
  reqmemberinfo,
  reqmemberedit,
} from "../.../../../../utils/request";
// 成功 失败的弹窗
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      // 角色列表
      rolelist: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      // 会员菜单
      memberreqListActions: "member/reqListActions",
    }),
    // *****取消按钮*****
    cencal() {
      this.info.isshow = false;
    },
    //清空
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: "",
      };
    },
    //
    close() {
      // 是添加开的弹窗 不进行处理 是编辑的弹窗 清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 添加按钮
    // toAdd() {
    //   requseradd(this.form).then((res) => {
    //     if (res.data.code == 200) {
    //       successAlert(res.data.msg);
    //     } else {
    //       warningAlert(res.data.msg);
    //     }
    //   });
    // },
    // 编辑查看
    tolook(uid) {
      console.log(uid, "touid");
      reqmemberinfo(uid).then((res) => {
        if (res.data.code == 200) {
          //       //这个时候form是没有id的
          this.form = res.data.list;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    toEdit() {
      reqmemberedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 添加成功 添加弹窗消失  并且 清空内容
          this.cencal();
          //清空
          this.empty();
          //
          this.memberreqListActions();
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
</style>