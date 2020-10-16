<template>
  <div>
    <!-- <h1>登录</h1> -->
    <!--    default-expand-all   默认展开 -->
    <el-table
      :data="specslist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>

      <el-table-column label="规格属性" sortable width="300">
        <!-- 使用了作用域插槽 -->
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
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
          <del-btn @confirm="open(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
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
      :total="specstotal"
      :page-size="specssize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// axios
import { reqspecsdelete } from "../../../utils/request";
// alert
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      //   catelist: "cate/list",
      specslist: "specs/list",
      // 查询条数
      specssize: "specs/size",
      //页码
      specstotal: "specs/total",
    }),
  },
  methods: {
    ...mapActions({
      //   catereqListActions: "cate/reqListActions",
      specsreqListActions: "specs/reqListActions",
      // 总数
      specsreqtotalActions: "specs/reqtotalActions",
      //  修改页码
      specschangepageActions: "specs/changepageActions",
    }),

    // 编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    //删除按钮
    open(id) {
      reqspecsdelete(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 刷新数据
          this.specsreqListActions();
          //
          this.specsreqtotalActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 分页修改
    changePage(e) {
      // console.log(e, "eeeeeeeee");
      this.specschangepageActions(e);
    },

    // ******************
  },
  mounted() {
    //   商品分类的数据
    // this.catereqListActions();
    //商品规格列表
    this.specsreqListActions();
    // 总数
    this.specsreqtotalActions();
  },
};
</script>
<style scoped>
.listImg {
  width: 150px;
  height: 150px;
}
</style>