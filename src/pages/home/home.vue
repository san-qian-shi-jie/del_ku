<template>
  <div class="add">
    <!-- <h1>home页面</h1> -->

    <div class="box" id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
//
//
import echarts from "echarts";
//
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      catelist: "cate/list",
    }),
  },

  watch: {
    catelist: {
      handler() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("box"));
        // echarts 进行数据的上传
        var option = {
          title: {
            text: "商品分类",
          },
          tooltip: {},
          legend: {
            data: ["下级分类数量"],
          },
          xAxis: {
            data: this.catelist.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "下级分类数量",
              type: "line",
              data: this.catelist.map((item) => item.children.length),
            },
          ],
        };
        myChart.setOption(option);
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions({
      catereqListActions: "cate/reqListActions",
    }),

    /* 
     tu() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("box"));
        var option = {
          title: {
            text: "商品分类",
          },
          tooltip: {},
          legend: {
            data: ["下级分类数量"],
          },
          xAxis: {
            data: this.catelist.map((item) => item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "下级分类数量",
              type: "line",
              data: this.catelist.map((item) => item.children.length),
            },
          ],
        };
        myChart.setOption(option);
    },
    
    */

    //
  },
  mounted() {
    this.catereqListActions();
  },
};
</script>
<style scoped>
.add {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.box {
  width: 80vw;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50% -50%);
}
</style>