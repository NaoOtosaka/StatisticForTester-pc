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
        width="600px"
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
            multiple>
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
          {{ scope.row.testTime }}
        </span>
        <div v-if="docEditTag && editIndex === scope.row.projectId" class="block">
          <el-date-picker
              v-model="scope.row.testTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
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
          {{ scope.row.publishTime }}
        </span>
        <div v-if="docEditTag && editIndex === scope.row.projectId" class="block">
          <el-date-picker
              v-model="scope.row.publishTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
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
    test() {
      this.projectData = this.projectInfo
    },
    toInfoUrl(projectId){
      this.$router.push({path:'/data/project/info', query:{projectId: projectId}})
    },
    testerList(){
      this.axios({
        url: "/api/v1/tester/list",
        method: "get",
        params: {}
      }).then(res => {
        this.testerListData = res.data.data
        this.getTesterShowList(res.data.data)
        console.log(this.testerListData)
      })
    },
    getTesterShowList(res) {
      console.log(res)
      for (let i=0;i<res.length;i++){
        this.testerShowData[res[i]['testerId']] = res[i]['testerName']
      }
      console.log(this.testerShowData)
    },
    getPlannerList() {
      this.axios({
        url: "/api/v1/planner/list",
        method: "get",
        params: {}
      }).then(res=> {
        this.plannerData = res.data.data
        this.getPlannerShowList(res.data.data)
        console.log(this.plannerData)
      })
    },
    getPlannerShowList(res) {
      console.log(res)
      for (let i=0;i<res.length;i++){
        this.plannerShowData[res[i]['plannerId']] = res[i]['plannerName']
      }
      console.log(this.plannerShowData)
    },
    sendTesterId(value) {
      console.log(value)
      this.$forceUpdate()
    },
    changeEditStatus(index) {
      this.docEditTag = !this.docEditTag
      this.editIndex = index
    },
    resetEditStatus() {
      this.docEditTag = !this.docEditTag
      this.editIndex = -1
    },
    updateProjectInfo(projectId, projectName, docUrl, plannerId, tester, testTime, publishTime) {
      console.log(tester)
      let temp = ''
      for (let i=0;i<tester.length;i++) {
        temp += tester[i]
        if (i !== tester.length - 1){
          temp += ','
        }
      }
      let params = new URLSearchParams()
      params.append('projectId', projectId)
      params.append('projectName', projectName)
      params.append('plannerId', plannerId)
      params.append('docUrl', docUrl)
      params.append('tester',temp);
      params.append('testTime', testTime)
      params.append('publishTime', publishTime)

      this.axios({
        url: "/api/v1/project",
        method: "put",
        params: params
      }).then(res=> {
        if(res['data']['status'] === 1){
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }else{
          this.$message.error(res['data']['message'])
        }
        this.resetEditStatus()
      })
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