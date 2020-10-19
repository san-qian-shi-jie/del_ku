<template>
  <div class="add">
    <!-- <h1>登录</h1> -->
    <el-dialog
      :title="info.isAdd ? '角色添加' : '角色修改'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <!--  <h2>增加</h2> -->
      <el-form ref="form" :model="form" label-width="80px">
        <!--  -->

        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动期限">
          <el-date-picker
            v-model="value1"
            type="daterange"
            align="right"
            value-format="timestamp"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类">
          <!--  -->
          <!-- <el-input v-model="form.icon"></el-input> -->
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择分类"
            @change="changecateFilst"
          >
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <!--  -->
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择分类"
            @change="changepidsecond"
          >
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <!--  -->
          <el-select
            v-model="form.goodsid"
            placeholder="请选择商品"
            @change="changepidthree"
          >
            <el-option
              v-for="item in threeshop"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
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
  reqcatelist,
  //
  reqgoodslist,
  //
  reqseckadd,
  reqseckinfo,
  reqseckedit,
} from "../../../utils/request";
// alert
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      //   二级分类表
      secondCateList: "",
      //   商品
      threeshop: "",
      //   时间
      pickerOptions: {
        // 限制时间
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      //   时间
      value1: "",
      icons: "",
    };
  },
  computed: {
    ...mapGetters({
      //
      catelist: "cate/list",
      //
      goodslist: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      // 商品管理
      goodsreqListActions: "goods/reqListActions",
      //商品分类
      catereqListActions: "cate/reqListActions",
      //
      seckillreqListActions: "seckill/reqListActions",
    }),
    // 消失动画完成后
    close() {
      // 是添加开的弹窗 不进行处理 是编辑的弹窗 清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //一级分类
    changecateFilst() {
      //一级分类变了，二级分类的值应该置空
      this.form.second_cateid = "";
      this.changepidsecond();
    },
    // 二级分类
    changepidsecond() {
      //二级分类变了，三级分类：商品的值应该置空
      this.form.goodsid = "";
      reqcatelist({ pid: this.form.first_cateid }).then((res) => {
        // console.log(res.data.list, "二级分类二级分类res.data.list");
        this.secondCateList = res.data.list;
      });
      this.changepidthree();
    },
    // 三级分类：商品
    changepidthree() {
      // console.log(
      //   this.form.first_cateid,
      //   this.form.second_cateid,
      //   "三级分类收盘"
      // );
      reqgoodslist({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        // console.log(res.data.list, "三级分类：商品res.data.list");
        this.threeshop = res.data.list;
      });
    },

    // 添加按钮
    add() {
      // let begdata = this.value1[0].getTime();
      // let enddata = this.value1[1].getTime();
      let data = {
        ...this.form,
        begintime: this.value1[0],
        endtime: this.value1[1],
      };
      // console.log(this.value1, "this.value1");
      console.log(data, "this.form");

      reqseckadd(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 清空
          this.empty();
          // 关闭
          this.open();
          // 刷新数据
          this.seckillreqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //
    tolook(id) {
      console.log(id, "look");
      reqseckinfo(id).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.list, "res.data.list");
          this.form = res.data.list;
          this.form.id = id;
          this.value1 = [this.form.begintime, this.form.endtime];
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改信息
    updata() {
      // console.log(this.form);
      let data = {
        ...this.form,
        begintime: this.value1[0],
        endtime: this.value1[1],
      };
      reqseckedit(this.form).then((res) => {
        // 清空
        this.empty();
        // 关闭
        this.open();
        // 刷新数据
        this.seckillreqListActions();
      });
    },
    // 取消按钮
    open() {
      this.info.isshow = false;
    },

    //
    changePid() {},
    //原生得图片  获取图片
    // getFile(e) {
    //   let file = e.target.files[0];
    //   console.log(file);
    //   // console.log(URL.createObjectURL(file));
    //   //URL.createObjectURL() 可以通过文件生成一个地址
    //   if (file.size > 2 * 1024 * 1024) {
    //     warningAlert("文件不能超过2M");
    //     return;
    //   }
    //   this.imgUrl = URL.createObjectURL(file);
    //   //将文件保存在form.img
    //   this.form.img = file;
    // },

    //清空
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      //   二级分类表
      this.secondCateList = "";
      //   商品
      this.threeshop = "";
      //   时间
      this.value1 = "";
    },
  },

  // *********************

  mounted() {
    this.goodsreqListActions();
    this.catereqListActions();
  },
};
</script>
<style  scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}

.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}

.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
/* element-ui */
/* .add >>>.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
} */
</style>