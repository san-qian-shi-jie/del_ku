<template>
  <div>
    <!-- <h1>角色管理</h1> -->
    <el-button type="primary" @click="addwill">添加</el-button>
    <!-- <add-btn @toaddbtn = addbtn></add-btn> -->
    <role-add :info="info" ref="look"></role-add>
    <!--  -->
    <role-list @edit="edit"></role-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
//
import roleAdd from "./component/add";
import roleList from "./component/list";
export default {
  props: [],
  components: {
    roleAdd,
    roleList,
  },
  data() {
    return {
      info: {
        // 添加弹框的状态
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
      this.$refs.look.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>