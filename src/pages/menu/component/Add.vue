<template>
  <div>
    <!-- <h1>增加</h1> -->
    <!--  -->
    <el-dialog
      :title="info.isAdd ? '添加信息' : '编辑信息'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!--  -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" v-if="form.type == 1">
          <!--  -->
          <!-- <el-input v-model="form.icon"></el-input> -->
          <el-select v-model="form.icon" placeholder="请选择上级菜单的图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择上级菜单的图标">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
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

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toAdd" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="toEdit" v-else>修改</el-button>
        <el-button type="info" @click="cencal">取消</el-button>
      </div>
      <!--  -->
    </el-dialog>
  </div>
</template>
<script>
// vuex
import { mapGetters, mapActions } from "vuex";
// axios 添加 查询一条 修改
import { reqmenuadd, reqMenuinfo, reqMenuedit } from "../../../utils/request";
// 路由引入
import { indexRouters } from "../../../router/index";
// 成功 失败的弹窗
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      //   图标
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
        "el-icon-s-goods",
        "el-icon-success",
        "el-icon-s-promotion",
      ],
      // 路由
      indexRouters: indexRouters,
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListActions: "menu/reqListActions",
    }),
    // 添加信息
    toAdd() {
      // console.log(this.form,"this.from");
      reqmenuadd(this.form).then((res) => {
        // console.log("添加成功", res);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 添加成功 添加弹窗消失  并且 清空内容
          this.cencal();
          // 清空弹窗的内容
          this.empty();
          // 刷新列表数据
          this.reqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改 编辑 记录信息
    toEdit() {
      reqMenuedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cencal();
          this.empty();
          this.reqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 查看调用的信息
    toLook(id) {
      // console.log(id,"look的id");
      reqMenuinfo(id).then((res) => {
        if (res.data.code) {
          // 此时收货的数据是没有id的  手动添加补全
          this.form = res.data.list;
          this.form.id = id;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //取消 button
    cencal() {
      this.info.isshow = false;
    },
    close() {
      // 是添加开的弹窗 不进行处理 是编辑的弹窗 清空
      if(!this.info.isAdd){
        this.empty()
      }
    },
    // from 中内容清空
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 当发生变化时修改 类型  菜单是/地址/图标
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>