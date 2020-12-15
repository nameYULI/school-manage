<!--
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 16:35:16
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 18:26:11
-->
  <template>
  <div class="dashboard-container">
    <el-table
      :data="users"
      style="width: 100%"
      >

      <el-table-column
        prop="id"
        label="学院id"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="学院名称"
        >
      </el-table-column>
      <el-table-column
        prop="major"
        label="专业"
       >
      </el-table-column>
      <el-table-column
        prop="renshu"
        label="人数">
      </el-table-column>

      <el-table-column
        prop="school_name"
        label="学校名称"
        >
        <template slot-scope="scope" >
          <span class="" v-if="scope.row.school_name">
            <el-tag
              type='success'
              disable-transitions>{{scope.row.school_name}}</el-tag>
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
    name: 'academy',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    data() {
      return {
        apiModel:'academy',
        users: []
      }
    },
    methods: {
      onSubmit() {
        console.log(123434)
      },
      handleEdit(index, item) {
        this.$router.push({ path: '/'+this.apiModel+'/editor', query: {_id:item.id} })
      },
      handleDelete(index, item) {
        this.$http.post('/api/'+this.apiModel+'/delete', item).then(res => {
          this.findUser()
        })

      },
      findUser(){
        this.$http.get('/api/'+this.apiModel+'/list', this.users).then(res => {
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