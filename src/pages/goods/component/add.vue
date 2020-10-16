<template>
  <div class="add">
    <!-- <h1>登录</h1> -->
    <el-dialog
      :title="info.isAdd ? '商品管理++' : '商品修改'"
      :visible.sync="info.isshow"
      @closed="close"
      @opened="opened"
    >
      <!--  <h2>增加</h2> -->
      <el-form ref="form" :model="form" label-width="80px">
        <!--  -->
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changecateFilst"
          >
            <!-- <el-option label="顶级分类" :value="0" disabled></el-option> -->
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <!-- <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changepidsecond"
          > -->
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <!--  -->
        <!-- 原生 上传文件 start-->
        <!-- 如果添加成功之后，再次添加上一次的文件，就不会再出发change；如果要解决这个bug,我们就在弹框消失的时候，将input也销毁 -->
        <!-- v-if="form.pid != 0" -->
        <el-form-item label="图片">
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

        <el-form-item label="商品规格">
          <!-- <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changespecsid"
          > -->
          <el-select v-model="form.specsid" @change="changespecsid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in goodsAttrList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <!-- <textarea v-model="form.description" cols="30" rows="10"></textarea> -->
          <!-- 富文本 -->
          <div v-if="info.isshow" id="editor"></div>
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
  reqgoodsadd,
  reqgoodsinfo,
  reqgoodsedit,
} from "../../../utils/request";
// alert
import { successAlert, warningAlert } from "../../../utils/alert";
//
import E from "wangEditor";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的 '[]',所以 记得在请求前 转换格式
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //二级分类的list
      secondCateList: [],
      //商品属性list
      goodsAttrList: [],

      //
    };
  },
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      //   规格
      specslist: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      //请求商品分类list
      catereqListActions: "cate/reqListActions",
      //商品规格list
      specsreqListActions: "specs/reqListActions",
      //goods list
      goodsreqListActions: "goods/reqListActions",
      // 总数
      goodsreqtotalActions: "goods/reqtotalActions",
      //goods count
    }),

    // 一级分类的联动
    changecateFilst() {
      //一级分类变了，二级分类的值应该置空
      this.form.second_cateid = "";
      this.changecateFilst_second();
    },
    //获得二级分类list
    changecateFilst_second() {
      reqcatelist({ pid: this.form.first_cateid }).then((res) => {
        //   console.log(res.data.list,"res.data.list");
        this.secondCateList = res.data.list;
      });
    },

    ////商品规格发生了改变，计算商品属性的数组
    changespecsid() {
      //商品规格变了，商品属性先置空
      this.form.specsattr = [];
      this.changespecsid_xia();
    },
    changespecsid_xia() {
      //   console.log(this.specslist, "this.specslist");
      //   console.log(this.form.specsid, "this.form.specsid");
      //   在specsList中找到 找到哪一条数据的id和当前this.form.specsid是一样的。
      let obj = this.specslist.find((item) => {
        return item.id == this.form.specsid;
      });
      // 把这条数据的attrs赋值给goodsAttrList;
      //   console.log(obj, "obj");
      this.goodsAttrList = obj.attrs;
    },

    //

    // 消失动画完成后
    close() {
      // 是添加开的弹窗 不进行处理 是编辑的弹窗 清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //
    opened() {
      //富文本
      this.editor = new E("#editor");
      this.editor.create();
      //编辑器创建完成以后再赋值
      this.editor.txt.html(this.form.description);
    },
    // 添加按钮
    add() {
      console.log(this.form);
      //将富文本编辑器的内容取出来给form.description
        this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      console.log(data, "data");
      reqgoodsadd(data).then((res) => {
        // console.log(res, "res");
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 清空
          this.empty();
          // 关闭
          this.open();
          // 刷新数据
          this.goodsreqListActions();
          // 总数
          this.goodsreqtotalActions();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //
    tolook(id) {
      console.log(id, "look");
      reqgoodsinfo(id).then((res) => {
        if (res.data.code == 200) {
          // successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.id = id;

          //需要请求一下二级分类的list
          this.changecateFilst_second();

          this.imgUrl = this.$imgurl + this.form.img;
          //商品属性从字符串转为 []
          this.form.specsattr = JSON.parse(this.form.specsattr);

          //获取商品属性的数组
          this.changespecsid_xia();
          //
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    // 修改信息
    updata() {
      // console.log(this.form);
      //将富文本编辑器的内容取出来给form.description
        this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      console.log(data);
      //
      reqgoodsedit(data).then((res) => {
        // 清空
        this.empty();
        // 关闭
        this.open();
        // 刷新数据
        this.goodsreqListActions();
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
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      //二级分类的list
      this.secondCateList = [];
      //商品属性list
      this.goodsAttrList = [];
    },
  },

  // *********************

  mounted() {
    //   拿到数据
    //如果商品一级分类没有请求过，就请求一次
    if (this.catelist.length == 0) {
      this.catereqListActions();
    }

    //由于商品规格模块使用了分页，但是商品管理模块需要所有的商品规格，不要分页，所以多传递一个参数，用来判断是否需要分页
    this.specsreqListActions(true);
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
</style>