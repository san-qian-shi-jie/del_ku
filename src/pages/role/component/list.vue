<template>
  <div>
    <h1>列表</h1>
    <!--  -->
    <!--  default-expand-all -->
    <el-table
      :data="rolelist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="rolename" label="角色名称" sortable width="180">
      </el-table-column>

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
          <!-- <el-button type="danger" @click="open(scope.row.id)">删除</el-button> -->
          <del-btn @confirm="open(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!--  -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// alert
import { successAlert, warningAlert } from "../../../utils/alert";

// axios  删除
import { reqroledelete } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      rolelist: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      rolereqListActions: "role/reqListActions",
    }),
    open(id) {
      reqroledelete(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.rolereqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
    this.rolereqListActions();
  },
};
</script>
<style scoped>
</style>