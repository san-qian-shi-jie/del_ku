<template>
  <div>
    <h1>登录</h1>
    <el-dialog
      :title="info.isAdd ? '添加信息' : '编辑信息'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <!--  -->
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名称">
          <el-input v-model="form.username"></el-input>
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
        <el-button type="primary" v-if="info.isAdd" @click="toAdd"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="toEdit">修改</el-button>

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
  requserinfo,
  requseredit,
} from "../.../../../../utils/request";
// 成功 失败的弹窗
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
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
      // 角色菜单
      rolereqListActions: "role/reqListActions",
      // 管理员菜单
      userreqListActions: "user/reqListActions",
      // 总数
      userreqtotalActions: "user/reqtotalActions",
    }),
    // *****取消按钮*****
    cencal() {
      this.info.isshow = false;
    },
    //清空
    empty() {
      this.form = {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
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
    toAdd() {
      requseradd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          // 添加成功 添加弹窗消失  并且 清空内容
          this.cencal();
          // 刷新数据
          this.userreqListActions();
          // 重新拿总数
          this.userreqtotalActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 编辑查看
    tolook(uid) {
      // console.log(uid, "touid");
      requserinfo(uid).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    toEdit() {
      requseredit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 添加成功 添加弹窗消失  并且 清空内容
          this.cencal();
          //清空
          this.empty();
          // 刷新数据
          this.userreqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.rolereqListActions();
  },
};
</script>
<style scoped>
</style>