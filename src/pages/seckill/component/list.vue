<template>
  <div>
    <!-- <h1>商品管理</h1> -->
    <!--    default-expand-all   默认展开 -->
    <el-table
      :data="seckilllist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" label="活动名称" sortable width="150">
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

      <el-table-column prop="address" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="open(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!--  -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// axios
import { reqgoodsdelete } from "../../../utils/request";
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
      //
      seckilllist: "seckill/list",
    }),
  },
  methods: {
    ...mapActions({
      //
      seckillreqListActions: "seckill/reqListActions",
    }),

    // 编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    //删除按钮
    open(id) {
      reqgoodsdelete(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 刷新数据
          this.goodsreqListActions();
          // 总数
          this.goodsreqtotalActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    // ******************
  },
  mounted() {
    //
    this.seckillreqListActions();
  },
};
</script>
<style scoped>
.scopeimg {
  width: 100px;
  height: 100px;
}
</style>