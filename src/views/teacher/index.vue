<!--
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 21:00:20
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 21:12:58
-->
<template>
  <div class="dashboard-container">
    <el-table
      :data="users"
      style="width: 100%"
      >
      <el-table-column
        prop="teacher_name"
        label="名字"
        >
      </el-table-column>
      <el-table-column
        prop="teacher_age"
        label="年龄"
        >
      </el-table-column>
      <el-table-column
        prop="teacher_level"
        label="等级">
      </el-table-column>
      <el-table-column
        prop="teacher_sex"
        label="性别">
      </el-table-column>
      <!--      列表添加项目
-->
      <el-table-column
        prop="school_id"
        label="学校名称"
        >
        <template slot-scope="scope" >
          <span class="" v-if="scope.row.school_id">
            <el-tag
              type='success'
              disable-transitions>{{scope.row.school_name}}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="academy_id"
        label="学院名称"
        >
        <template slot-scope="scope" >
          <span class="" v-if="scope.row.academy_id">
            <el-tag
              type= 'success'
              disable-transitions>{{scope.row.name}}</el-tag>
          </span>

        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'teacher',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        apiModel:'teacher',
        users: []
      }
    },
    methods: {
      handleEdit(index, item) {
        this.$router.push({ path: '/'+this.apiModel+'/editor', query: {_id:item.teacher_id} })
      },
      handleDelete(index, item) {
        this.$http.post('/api/'+this.apiModel+'/delete', item).then(res => {
          this.findUser()
        })

      },
      findUser(){
        this.$http.get('/api/'+this.apiModel+'/list', this.user).then(res => {
          this.users = res
        })
      }
    },
    mounted() {
      this.findUser()
    }
  }
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

