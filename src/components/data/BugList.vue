<template>
    <el-table
        v-loading="loading"
        :data="bugData"
        border
        width="100%"
        :default-sort = "{order: 'descending'}"
        ref="table"
        stripe>
      <el-table-column
          prop="bugId"
          label="ID"
          sortable
          width="80px">
      </el-table-column>
      <el-table-column
          prop="kbId"
          label="看板ID"
          width="100px">
        <template slot-scope="scope">
          <el-link target="blank" :href="'http://km.pm.netease.com/v6/issues/' + scope.row.kbId" :underline="false">
            {{ scope.row.kbId }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="bugTitle"
          label="主题"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="bugModel"
          label="模块"
          width="250%"
          sortable
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="bugCategory"
          label="类型"
          sortable
          width="150px"
          show-overflow-tooltip>
        <template slot-scope="scope">
          <el-select
              style="width: 100%"
              v-model="scope.row.bugCategory"
              placeholder="请选择分类"
              @change="updateBugInfo(
                  scope.row.kbId,
                  scope.row.bugCategory
              )">
            <el-option
                v-for="item in categoryListData"
                :key="item.categoryId"
                :label="item.categoryName"
                :value="item.categoryId">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
          prop="bugType"
          label="跟踪标签"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="projectName"
          label="项目名"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="testerName"
          label="QA"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="developerName"
          label="开发"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
    </el-table>
</template>

<script>
import axios from "axios";

export default {
  // props: ["bugData"],
  props: {
    bugData: {
      default: null
    },
    getChartsRef: {
      default: null
    }
  },
  data() {
    return {
      loading: true,
      dataColumn: [],
      tableHeight: 50,
      categoryListData: [],
      categoryShowData: [],
    }
  },
  methods: {
    categoryList(){
      this.axios({
        url: "/api/v1/bug/category/list",
        method: "get",
        params: {}
      }).then(res => {
        console.log(res.data.data)
        this.categoryListData = res.data.data

        // 数据处理
        for (let i=0;i<res.data.data.length;i++) {
          this.categoryShowData[res.data.data[i]['categoryId']] = res.data.data[i]['categoryName']
        }
        this.loading = false
      })
    },
    editBugCategory(params) {
      // 编辑测试人员跟进接口
      return this.axios({
        url: "/api/v1/bug/edit_category",
        method: "put",
        params: params
      })
    },
    updateBugInfo(bugId, categoryId){
      // 参数封装
      let bugParams = new URLSearchParams()
      bugParams.append('kbId', bugId)
      bugParams.append('bugCategory', categoryId)

      // 接口请求
      // 请求队列初始化
      let req_list = [this.editBugCategory(bugParams)]

      axios.all(req_list).then(axios.spread((...res) => {
            let temp = [...res]
            console.log(temp)
            let tag = 1
            for(let i=0;i<temp.length;i++){
              console.log(temp)
              if(temp[i]['data']['status'] !== 1){
                tag = 0
              }
            }
            if(tag){
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }else{
              this.$message.error('系统错误')
            }
            this.getChartsRef()
          })
      )
    }
  },
  mounted:function(){
    this.categoryList()
    this.$nextTick(function () {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 50;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 50
      }
    })
  }
}
</script>