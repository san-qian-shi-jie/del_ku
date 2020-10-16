<template>
  <div>
    <!-- <h1>列表</h1> -->
    <!--    default-expand-all   默认展开 -->
    <el-table
      :data="memberlist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>

      <el-table-column prop="phone" label="手机号"> </el-table-column>

      <el-table-column prop="status" label="状态">
        <!-- 使用了作用域插槽 -->
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1" disabled
            >启用</el-button
          >
          <el-button type="info" v-else disabled>未启用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <!-- <del-btn @confirm="open(scope.row.uid)"></del-btn> -->
          <!-- <el-button type="danger" @click="open(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// vuex
import { mapGetters, mapActions } from "vuex";
// 弹出的提示框
import { successAlert, warningAlert } from "../../../utils/alert";
//   list  删除
import { requserlist, requserdelete } from "../../../utils/request";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      // 列表
      memberlist: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      // 会员菜单
      memberreqListActions: "member/reqListActions",
    }),
    // 删除
    open(id) {
      requserdelete(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 刷新数据
          this.userreqListActions();
          // // 重新拿总数
          this.userreqtotalActions();
        } else {
          requserdelete(res.data.msg);
        }
      });
    },
    // 编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    // 修改
    toAddModify(id) {
      // 传递 id 到 add
      this.$emit("toAddModify", id);
    },
    //
    changePage(e) {
      // console.log(e,"eeee");
      this.userchangePageAction(e);
    },
  },
  mounted() {
    // 列表
    this.memberreqListActions();
  },
};
</script>
<style scoped>
</style>