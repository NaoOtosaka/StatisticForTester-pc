<template>
  <el-table
      :data="data"
      border
      width="100%"
      :height="tableHeight"
      :default-sort = "{order: 'descending'}"
      ref="table"
      stripe>
    <el-table-column
        prop="projectId"
        label="项目ID"
        sortable
        width="100px"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="projectName"
        label="项目名"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="docUrl"
        label="文档地址"
        width="500px"
        show-overflow-tooltip>
      <template slot-scope="scope">
        <span v-if="docEditTag === false || editIndex !== scope.row.projectId" style="width: 95%">
          {{ scope.row.docUrl }}
        </span>
        <el-input
            v-if="docEditTag && editIndex === scope.row.projectId"
            v-model="scope.row.docUrl"
            style="width: 95%"
            :placeholder="scope.row.docUrl">
        </el-input>
      </template>
    </el-table-column>
    <el-table-column
        prop="planner"
        label="策划"
        show-overflow-tooltip>
      <template slot-scope="scope">
        <span v-if="docEditTag === false || editIndex !== scope.row.projectId" style="width: 95%">
          {{ plannerShowData[scope.row.planner] }}
        </span>
        <el-select
            v-if="docEditTag && editIndex === scope.row.projectId"
            style="width: 100%"
            v-model="scope.row.planner"
            placeholder="请选择策划">
          <el-option
              v-for="item in plannerData"
              :key="item.plannerId"
              :label="item.plannerName"
              :value="item.plannerId">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
        prop="tester"
        label="跟进QA"
        show-overflow-tooltip>
      <template slot-scope="scope">
        <span v-if="docEditTag === false || editIndex !== scope.row.projectId" style="width: 95%">
          <span v-for="(value,index) in scope.row.tester">
            {{ testerShowData[value]}}
            <span v-if="index !== scope.row.tester.length - 1 && scope.row.tester.length !== 1">
              、
            </span>
          </span>
        </span>
        <el-select
            v-if="docEditTag && editIndex === scope.row.projectId"
            v-model="scope.row.tester"
            clearable placeholder="全部"
            style="height: 100%"
            multiple
            collapse-tags>
          <el-option
              v-for="item in testerListData"
              :key="item.testerId"
              :label="item.testerName"
              :value="item.testerId">
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column
        prop="testTime"
        label="提测时间"
        show-overflow-tooltip>
      <template slot-scope="scope">
        <span v-if="docEditTag === false || editIndex !== scope.row.projectId" style="width: 100%;height: 100%">
          {{ dateDeal(scope.row.testTime) }}
        </span>
        <div v-if="docEditTag && editIndex === scope.row.projectId" class="block">
          <el-date-picker
              v-model="scope.row.testTime"
              type="date"
              :clearable=false
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
              style="width: 100%">
          </el-date-picker>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        prop="publishTime"
        label="上线时间"
        show-overflow-tooltip>
      <template slot-scope="scope">
        <span v-if="docEditTag === false || editIndex !== scope.row.projectId" style="width: 100%;height: 100%">
          {{ dateDeal(scope.row.publishTime) }}
        </span>
        <div v-if="docEditTag && editIndex === scope.row.projectId" class="block">
          <el-date-picker
              v-model="scope.row.publishTime"
              type="date"
              :clearable=false
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="timestamp"
              style="width: 100%">
          </el-date-picker>
        </div>
      </template>
    </el-table-column>
    <el-table-column
        label="操作"
        width="140px">
      <template slot-scope="scope">
        <el-button
            type="text"
            @click="toInfoUrl(scope.row.projectId)">
          查看详情
        </el-button>
        <el-button
            type="text"
            v-if="docEditTag === false"
            @click="changeEditStatus(scope.row.projectId)">
          编辑
        </el-button>
        <el-button
            type="text"
            v-if="docEditTag && editIndex === scope.row.projectId"
            @click="updateProjectInfo(
                scope.row.projectId,
                scope.row.projectName,
                scope.row.docUrl,
                scope.row.planner,
                scope.row.tester,
                scope.row.testTime,
                scope.row.publishTime)">
          保存
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  props: ["data"],
  data() {
    return {
      dataColumn: [],
      testerListData: [],
      testerShowData: {},
      plannerData: [],
      plannerShowData: {},
      tableHeight: 50,
      docEditTag: false,
      editIndex: -1
    }
  },
  methods: {
    toInfoUrl(projectId){
      // 项目详情跳转
      this.$router.push({path:'/data/project/info', query:{projectId: projectId}})
    },
    testerList(){
      // 测试人员列表获取
      this.axios({
        url: "/api/v1/tester/list",
        method: "get",
        params: {}
      }).then(res => {
        this.testerListData = res.data.data

        console.log(res.data.data)

        // 数据处理
        for (let i=0;i<res.data.data.length;i++){
          this.testerShowData[res.data.data[i]['testerId']] = res.data.data[i]['testerName']
        }
      })
    },
    getPlannerList() {
      // 策划列表获取
      this.axios({
        url: "/api/v1/planner/list",
        method: "get",
        params: {}
      }).then(res=> {
        this.plannerData = res.data.data
        // 数据处理
        for (let i=0;i<res.data.data.length;i++){
          this.plannerShowData[res.data.data[i]['plannerId']] = res.data.data[i]['plannerName']
        }
      })
    },
    changeEditStatus(index) {
      // 设置编辑态
      this.docEditTag = !this.docEditTag
      this.editIndex = index
    },
    resetEditStatus() {
      // 重置编辑态
      this.docEditTag = !this.docEditTag
      this.editIndex = -1
    },
    editProject(params) {
      // 编辑项目信息接口
      return this.axios({
        url: "/api/v1/project",
        method: "put",
        params: params
      })
    },
    editTestRecord(params) {
      // 编辑测试人员跟进接口
      return this.axios({
        url: "/api/v1/project/test_record",
        method: "put",
        params: params
      })
    },
    updateProjectInfo(projectId, projectName, docUrl, plannerId, tester, testTime, publishTime) {
      // 处理测试人员列表
      let temp = ''
      for (let i=0;i<tester.length;i++) {
        temp += tester[i]
        if (i !== tester.length - 1){
          temp += ','
        }
      }

      // 提测时间处理
      let testDate = new Date(testTime)
      testTime = testDate.getTime()

      // 发布时间处理
      let publishDate = new Date(publishTime)
      publishTime = publishDate.getTime()

      // 文档链接空字符处理
      if(docUrl === null){
        docUrl = ''
      }


      // 参数封装
      let projectParams = new URLSearchParams()
      projectParams.append('projectId', projectId)
      projectParams.append('projectName', projectName)
      projectParams.append('plannerId', plannerId)
      projectParams.append('docUrl', docUrl)
      projectParams.append('testTime', testTime)
      projectParams.append('publishTime', publishTime)

      let testerParams = new URLSearchParams()
      testerParams.append('projectId', projectId)
      testerParams.append('tester',temp);

      // 接口请求
      // 请求队列初始化
      let req_list = [this.editProject(projectParams), this.editTestRecord(testerParams)]

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
            this.resetEditStatus()
          })
      )
    },
    dateDeal(time) {
      if(time){
        let da = new Date(time);
        let year = da.getFullYear()
        let month = da.getMonth()+1
        let date = da.getDate()
        return [year,month,date].join('-')
      }else{
        return null
      }
    }
  },
  mounted:function(){
    this.testerList()
    this.getPlannerList()

    this.$nextTick(function () {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 50
      }
    })
  },
}
</script>