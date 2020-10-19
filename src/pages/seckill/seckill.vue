<template>
  <div>
    <el-button type="primary" @click="AddWill">添加</el-button>
    <!-- <h1>秒杀管理</h1> -->
    <v-add :info="info" ref="add"></v-add>
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