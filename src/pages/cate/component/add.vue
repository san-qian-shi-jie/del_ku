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
        <el-form-item label="上级分类">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changePid"
          >
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <!--  -->
        <!-- 原生 上传文件 start-->
        <!-- 如果添加成功之后，再次添加上一次的文件，就不会再出发change；如果要解决这个bug,我们就在弹框消失的时候，将input也销毁 -->
        <!-- v-if="form.pid != 0" -->
        <el-form-item label="图片" v-if="form.pid != 0">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              class="my-input"
              type="file"
              @change="getFile"
            />
          </div>
        </el-form-item>
        <!-- 原生 上传文件 end-->

        <!-- element-ui 上传文件 start -->
        <!-- <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->

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
import { reqcateadd, reqcateinfo, reqcateedit } from "../../../utils/request";
// alert
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      catelist: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      catereqListActions: "cate/reqListActions",
    }),
    // 消失动画完成后
    close() {
      // 是添加开的弹窗 不进行处理 是编辑的弹窗 清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    // 添加按钮
    add() {
      console.log(this.form);
      reqcateadd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 清空
          this.empty();
          // 关闭
          this.open();
          // 刷新数据
          this.catereqListActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //
    tolook(id) {
      console.log(id, "look");
      reqcateinfo(id).then((res) => {
        if (res.data.code == 200) {
          // successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.id = id;
          this.imgUrl = this.$imgurl + this.form.img;
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改信息
    updata() {
      // console.log(this.form);
      reqcateedit(this.form).then((res) => {
        // 清空
        this.empty();
        // 关闭
        this.open();
        // 刷新数据
        this.catereqListActions();
      });
    },
    // 取消按钮
    open() {
      this.info.isshow = false;
    },

    //
    changePid() {},
    //原生得图片  获取图片
    getFile(e) {
      let file = e.target.files[0];
      console.log(file);
      // console.log(URL.createObjectURL(file));
      //URL.createObjectURL() 可以通过文件生成一个地址
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件不能超过2M");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      //将文件保存在form.img
      this.form.img = file;
    },

    //清空
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      // this.imgUrl = "";
    },
  },

  // *********************

  mounted() {
    //   商品分类的数据
    //   this.catereqListActions()
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