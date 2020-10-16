<template>
  <div>
    <!-- <h1>列表</h1> -->
    <!--    default-expand-all   默认展开 -->
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="序列" sortable width="80">
      </el-table-column>

      <el-table-column prop="pid" label="上级编号" sortable width="120">
      </el-table-column>

      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>

      <el-table-column label="菜单图标" sortable width="180">
        <!-- prop="icon"  -->
        <!-- 使用了作用域插槽 -->
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址"> </el-table-column>

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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="open(scope.row.id)">删除</el-button>
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
// 删除
import { reqMenudelete } from "../../../utils/request";

export default {
  props: [],
  components: {},
  data() {
    return {};
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
    // 删除
    open(id) {
      this.$confirm("此操作将删除该信息, 是否继续?", "信息删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确认
          reqMenudelete(id).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              //   重新加载数据 更新页面
              this.reqListActions();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          // 点击取消
          warningAlert("已取消删除");
        });
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 修改
    toAddModify(id) {
      // 传递 id 到 add
      this.$emit("toAddModify", id);
    },
  },
  mounted() {
    this.reqListActions();
  },
};
</script>
<style scoped>
</style>