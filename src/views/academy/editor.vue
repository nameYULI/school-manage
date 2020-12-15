<!--
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 16:35:37
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 20:06:15
-->
<template>
  <div class="dashboard-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="学院名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.major"></el-input>
      </el-form-item>
      <el-form-item label="人数">
        <el-input v-model="form.renshu"></el-input>
      </el-form-item>

      <el-form-item label="所属学校">
        <el-select v-model="form.school_id" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.school_id"
            :label="item.school_name"
            :value="item.school_id"
          >
          </el-option>
        </el-select>
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
  name: "academy",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      options: [],
      apiModel: "academy",
      form: {}
    };
  },
  methods: {
    onSubmit() {
      if (this.form.id) {
        this.$http.post(`/api/${this.apiModel}/update`, this.form).then(res => {
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
      if (this.form.id) {
        this.$router.push({ path: this.apiModel });
      } else {
        this.form = {};
      }
    }
  },
  mounted() {
    if (this.$route.query._id) {
      this.$http
        .post("/api/" + this.apiModel + "/get", { id: this.$route.query._id })
        .then(res => {
          if (res && res.length > 0) {
            this.form = res[0];
          }
        });
    }

    this.$http.get("/api/school/list").then(res => {
      if (res && res.length > 0) {
        this.options = res;
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
