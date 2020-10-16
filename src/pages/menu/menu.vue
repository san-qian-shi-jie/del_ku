<template>
  <div>
    <!-- <h1>菜单管理</h1> -->
    <el-button type="primary" @click="AddWill">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import vAdd from "./component/Add";
import vList from "./component/list";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isshow: false,
        //添加还是编辑的状态 true添加 ，false 编辑
        isAdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    AddWill() {
      this.info.isshow = true;
      this.info.isAdd = true;
    },
    // 编辑 触发
    edit(id) {
      this.info.isshow = true;
      this.info.isAdd = false;
      // console.log(id, "触发编辑id", this.$refs.add );
      this.$refs.add.toLook(id)
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>