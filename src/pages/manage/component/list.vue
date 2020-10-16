<template>
  <div>
    <!-- <h1>列表</h1> -->
    <!--    default-expand-all   默认展开 -->
    <el-table
      :data="userlist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>

      <el-table-column prop="rolename" label="所属角色"> </el-table-column>

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
          <del-btn @confirm="open(scope.row.uid)"></del-btn>
          <!-- <el-button type="danger" @click="open(scope.row.id)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <!-- 
    total：设置总数 
    page-size：每页数量 
    有多少页，不用自己计算 

    current-change：当前页码发生了改变，就会触发，参数就是当前的页码
        
     
       -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="usertotal"
      :page-size="usersize"
      @current-change="changePage"
    >
    </el-pagination>
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
      userlist: "user/list",
      // 总数
      usertotal: "user/total",
      // 查询条数
      usersize: "user/size",
    }),
  },
  methods: {
    ...mapActions({
      // 管理员菜单
      userreqListActions: "user/reqListActions",
      // 总数
      userreqtotalActions: "user/reqtotalActions",
      // 改变页码
      userchangePageAction: "user/changePageAction",
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
    this.userreqListActions();
    // 总数
    this.userreqtotalActions();
  },
};
</script>
<style scoped>
</style>