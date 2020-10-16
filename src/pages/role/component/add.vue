<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '角色添加' : '角色修改'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!--  <h2>增加</h2> -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限">
          <!-- 
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
           -->
          <el-tree
            ref="tree"
            :data="menulist"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
        <el-button type="info" @click="open">取消</el-button>
      </div>
      <!--  -->
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// axios 添加  角色获取（一条） 修改编辑
import { reqroleadd, reqroleinfo, reqroleedit } from "../../../utils/request";
// alert
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      // 拿到菜单管理的数据
      menulist: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      menureqListActions: "menu/reqListActions",
      // 角色菜单
      rolereqListActions: "role/reqListActions",
    }),
    // 清空数据
    // from 中内容清空
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      // 清楚树状图的结构
      this.$refs.tree.setCheckedKeys([]);
    },
    // 点击半透明区域清空
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 关闭弹出窗口
    open() {
      this.info.isshow = false;
    },
    // 添加数据
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // console.log(this.$refs.tree.getCheckedKeys());
      // console.log(this.form);
      reqroleadd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 添加成功
          successAlert(res.data.msg);
          // 关闭弹窗
          this.open();
          // 清空弹窗的内容
          this.empty();
          //数据刷新
          this.rolereqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 编辑 修改
    look(id) {
      // console.log(id,"lookid");
      reqroleinfo(id).then((res) => {
        if (res.data.code == 200) {
          //这个时候form是没有id的
          this.form = res.data.list;
          // 加id
          this.form.id = id;
          //给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改数据 更新数据
    updata() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleedit(this.form).then((res) => {
        // console.log(res);
        if (res.data.code == 200) {
          // 添加成功
          successAlert(res.data.msg);
          // 关闭弹窗
          this.open();
          // 清空弹窗的内容
          this.empty();
          //数据刷新
          this.rolereqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 拿到添加列表中需要的菜单列表信息
    this.menureqListActions();
  },
};
</script>
<style scoped>
</style>