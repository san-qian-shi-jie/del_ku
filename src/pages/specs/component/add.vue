<template>
  <div class="add">
    <!-- <h1>登录</h1> -->
    <el-dialog
      :title="info.isAdd ? '添加商品规格' : '修改商品规格'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!--  <h2>增加</h2> -->
      <el-form ref="form" :model="form" label-width="80px">
        <!--  -->

        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <!-- <el-form-item label="规格属性">
          <div class="spe-con">
            <div class="input-wrap">
              <el-input v-model="form.attrs"></el-input>
            </div>
            <el-button type="primary">添加规格属性</el-button>
          </div>
        </el-form-item>

        <el-form-item label="规格属性">
          <div class="spe-con">
            <div class="input-wrap">
              <el-input v-model="form.attrs"></el-input>
            </div>
            <el-button type="danger">删除</el-button>
          </div>
        </el-form-item> -->
        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="spe-con">
            <div class="input-wrap">
              <el-input v-model="item.value"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addattrs"
              >添加规格属性</el-button
            >
            <el-button type="danger" v-else @click="delattrs(index)"
              >删除</el-button
            >
          </div>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!--  -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="info.isAdd" @click="add"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
        <el-button type="info" @click="open">取消</el-button>
      </div>
      <!--  -->
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

// axios 添加  角色获取（一条） 修改编辑
import {
  reqspecsadd,
  reqspecsinfo,
  reqspecsedit,
} from "../../../utils/request";
// alert
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrsArr: [{ value: "" }, { value: "" }],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      // catelist: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      // catereqListActions: "cate/reqListActions",
      specsreqListActions: "specs/reqListActions",
      // 总数
      specsreqtotalActions: "specs/reqtotalActions",
    }),
    //清空
    empty() {
      this.attrsArr = [{ value: "" }, { value: "" }];
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
    },

    //   新增规格属性
    addattrs() {
      this.attrsArr.push({ value: "" });
      console.log(this.attrsArr);
    },
    // 删除规格属性
    delattrs(index) {
      this.attrsArr.splice(index, 1);
    },
    // 消失动画完成后
    close() {
      // 是添加开的弹窗 不进行处理 是编辑的弹窗 清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 添加按钮
    add() {
      // console.log("this.attrsArr.map(item=>item.value)",this.attrsArr.map(item=>item.value));
      this.form.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      console.log(this.form);
      reqspecsadd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 清空
          this.empty();
          // 关闭
          this.open();
          // 刷新数据
          this.specsreqListActions();
          //
          this.specsreqtotalActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //
    tolook(id) {
      console.log(id, "look");
      reqspecsinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          //'['s','l','m']'--->[{value:'s'},{value:'l'},{value:'m'}]
          this.attrsArr = JSON.parse(this.form.attrs).map((item) => ({
            value: item,
          }));
          // console.log(this.attrsArr);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改信息
    updata() {
      this.form.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      console.log(this.form, "this.formthis.form");
      reqspecsedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 清空
          this.empty();
          // 关闭
          this.open();
          // 刷新数据
          this.specsreqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 取消按钮
    open() {
      this.info.isshow = false;
    },

    // **************************
  },
  // *******************
  mounted() {},
};
</script>
<style  scoped>
.spe-con {
  display: flex;
}
.input-wrap {
  flex: 1;
}
</style>