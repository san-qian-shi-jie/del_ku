<template>
  <div>
    <!-- <h1>登录</h1> -->
    <!--    default-expand-all   默认展开 -->
    <el-table
      :data="bannerlist"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="title" label="分类名称" sortable width="180">
      </el-table-column>

      <el-table-column label="图片" sortable width="300">
        <!-- 使用了作用域插槽 -->
        <template slot-scope="scope">
          <img
            v-if="scope.row.img != 'null'"
            :src="$imgurl + scope.row.img"
            alt=""
            class="listImg"
          />
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// axios
import { reqcatedelete } from "../../../utils/request";
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
      bannerlist: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      bannerreqListActions: "banner/reqListActions",
    }),

    // 编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    //删除按钮
    open(id) {
      reqcatedelete(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 刷新数据
          this.catereqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    //   商品分类的数据
    this.bannerreqListActions();
  },
};
</script>
<style scoped>
.listImg {
  width: 150px;
  height: 150px;
}
</style>