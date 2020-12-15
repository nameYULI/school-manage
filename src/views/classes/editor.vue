<!--
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 19:27:53
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 20:20:30
-->
<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属学校">
        <el-select
          v-model="form.school_id"
          placeholder="请选择"
          @change="schoolChange"
        >
          <el-option
            v-for="item in schools"
            :key="item.school_id"
            :label="item.school_name"
            :value="item.school_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属学院">
        <el-select v-model="form.academy_id" placeholder="请选择">
          <el-option
            v-for="item in academys"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称">
        <el-input v-model="form.class_name"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.class_major"></el-input>
      </el-form-item>
      <el-form-item label="人数">
        <el-input v-model="form.class_renshu"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "classes",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      schools: [],
      academys: [],
      //列表内容
      options: [],
      apiModel: "classes",
      form: {}
    };
  },
  methods: {
    onSubmit() {
      if (this.form.class_id) {
        this.$http.post(`/api/${this.apiModel}/update`, this.form).then(res => {
          console.log("bar:", res);
          this.$router.push({ path: this.apiModel });
          this.form = {};
        });
      } else {
        this.$http
          .post("/api/" + this.apiModel + "/add", this.form)
          .then(res => {
            this.$router.push({ path: this.apiModel });
            this.form = {};
          });
      }
    },
    cancle() {
      if (this.form.class_id) {
        this.$router.push({ path: this.apiModel });
      } else {
        this.form = {};
      }
    },
    schoolChange(val1) {
      //显示学院选择栏目
      this.$http.get("/api/academy/list").then(res => {
        if (res && res.length > 0) {
            this.academys = [];
          res.forEach(item => {
            if (item.school_id == val1) {
              this.academys.push(item);
            }
          });
        }
      });
    },
    showAcademy(val){
        this.$http.post("/api/academy/get",{id:val}).then(res=>{
            if(res&&res.length>0){
                this.academys=res
            }
        })
    }
  },
  mounted() {
    if (this.$route.query._id) {
      this.$http
        .post("/api/" + this.apiModel + "/get", { id: this.$route.query._id })
        .then(res => {
          if (res && res.length > 0) {
            this.form = res[0];
            this.showAcademy(res[0].academy_id);
            this.schoolChange(this.form.school);
          }
        });
    }

    //显示学校选择栏目
    this.$http.get("/api/school/list").then(res => {
      if (res && res.length > 0) {
        this.schools = res;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
