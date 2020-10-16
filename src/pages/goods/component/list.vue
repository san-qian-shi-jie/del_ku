<template>
  <div>
    <!-- <h1>商品管理</h1> -->
    <!--    default-expand-all   默认展开 -->
    <el-table
      :data="goodslist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="商品编号" sortable width="120">
      </el-table-column>

      <el-table-column prop="goodsname" label="商品名称" sortable width="150">
      </el-table-column>

      <el-table-column prop="price" label="商品价格" sortable width="120">
      </el-table-column>

      <el-table-column
        prop="market_price"
        label="市场价格"
        sortable
        width="150"
      >
      </el-table-column>

      <el-table-column label="图片" sortable width="300">
        <!-- 使用了作用域插槽 -->
        <template slot-scope="scope">
          <!-- <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag> -->
          <img :src="$imgurl + scope.row.img" class="scopeimg" alt="" />
        </template>
      </el-table-column>

      <el-table-column prop="isnew" label="是否新品">
        <!-- 使用了作用域插槽 -->
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1" disabled
            >是</el-button
          >
          <el-button type="info" v-else disabled>否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="是否热卖">
        <!-- 使用了作用域插槽 -->
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1" disabled
            >是</el-button
          >
          <el-button type="info" v-else disabled>否</el-button>
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

      <el-table-column prop="address" label="操作" width="180">
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
      :total="goodstotal"
      :page-size="goodssize"
      @current-change="changePage"
    >
    </el-pagination>
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
      goodslist: "goods/list",
      // 查询条数
      goodssize: "goods/size",
      //页码
      goodstotal: "goods/total",
    }),
  },
  methods: {
    ...mapActions({
      goodsreqListActions: "goods/reqListActions",
      // 总数
      goodsreqtotalActions: "goods/reqtotalActions",
      //  修改页码
      goodschangpageActions: "goods/changpageActions",
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
    // 分页修改
    changePage(e) {
      // console.log(e, "eeeeeeeee");
      this.goodschangpageActions(e);
    },

    // ******************
  },
  mounted() {
    //   商品分类的数据
    // this.catereqListActions();
    // 商品管理列表
    this.goodsreqListActions();
    // 总数
    this.goodsreqtotalActions();
  },
};
</script>
<style scoped>
.scopeimg {
  width: 100px;
  height: 100px;
}
</style>