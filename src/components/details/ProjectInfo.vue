<template>
  <el-card shadow="hover" class="box-card">
    <div slot="header" class="clearfix">
      <span>项目基础信息</span>
    </div>
    <div class="text item">
      <el-form ref="form" label-width="80px">
        <el-form-item label="项目ID">
          <el-input v-model="projectData.projectId" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="projectData.projectName" disabled></el-input>
        </el-form-item>
        <el-form-item label="对应策划">
          <el-select
              style="width: 100%"
              clearable
              v-model="projectData.planner"
              placeholder="请选择策划"
              @change="updateProjectInfo(projectData.projectId, projectData.projectName, projectData.planner)">
            <el-option v-for="item in this.plannerData"
                       :key="item.plannerId"
                       :label="item.plannerName"
                       :value="item.plannerId">
            </el-option>
          </el-select>
        </el-form-item>
<!--        <el-form-item label="跟进测试">-->
<!--          <el-select style="width: 100%" v-model="form.region" placeholder="请选择策划">-->
<!--            <el-option label="区域一" value="shanghai"></el-option>-->
<!--            <el-option label="区域二" value="beijing"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">编辑</el-button>-->
<!--&lt;!&ndash;          <el-button>取消</el-button>&ndash;&gt;-->
<!--        </el-form-item>-->
      </el-form>
    </div>
  </el-card>
</template>


<script>
export default {
  props: [
      'projectInfo'
  ],
  data() {
    return {
      projectData: [],
      plannerData: []
    }
  },
  methods: {
    test() {
      this.projectData = this.projectInfo
    },
    getPlannerList() {
      this.axios({
        url: "/api/v1/planner/list",
        method: "get",
        params: {}
      }).then(res=> {
        console.log(res)
        this.plannerData = res['data']['data']
        console.log(this.plannerData)
      })
    },
    updateProjectInfo(projectId, projectName, plannerId) {
      this.axios({
        url: "/api/v1/project",
        method: "put",
        params: {
          projectId: projectId,
          projectName: projectName,
          plannerId: plannerId
        }
      }).then(res=> {
        console.log(res)
        if(res['data']['status'] === 1){
          this.$message({
            message: '策划指定成功',
            type: 'success'
          })
        }else{
          this.$message.error(res['data']['message'])
        }
        this.$forceUpdate()
      })
    }
  },
  mounted() {
    this.getPlannerList()
  },
  watch: {
    projectInfo: 'test'
  }
}
</script>


<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
