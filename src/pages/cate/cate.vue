<template>
  <div>
    <!-- <h1>商品分类</h1> -->
    <el-button type="primary" @click="addwill">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <!--  -->
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import vAdd from "./component/add";
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
    addwill() {
      this.info.isshow = true;
      this.info.isAdd = true;
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isAdd = false;
      this.$refs.add.tolook(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>