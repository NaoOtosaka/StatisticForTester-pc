<!--仪表盘主框架-->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div style="float: left">
          <el-select v-model="value" @change="sendProjectId(value)"  clearable placeholder="全部">
            <el-option
                v-for="item in projectListData"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <BugTypeCountWithProject :projectId="value"/>
      </el-col>
      <el-col :span="12">
        <BugCategoryCountWithProject :projectId="value"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <BugDeveloperCountWithProject :projectId="value"/>
      </el-col>
      <el-col :span="12">
        <BugCategoryCountWithProject :projectId="value"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BugTypeCountWithProject from "@/components/chart/project/BugTypeCountWithProject";
import BugCategoryCountWithProject from "@/components/chart/bug/BugCategoryCountWithProject";
import BugDeveloperCountWithProject from "@/components/chart/bug/BugDeveloperCountWithProject";

export default {
  components: {
    BugTypeCountWithProject,
    BugCategoryCountWithProject,
    BugDeveloperCountWithProject
  },
  data() {
    return {
      projectListData: [],
      value: ''
    }
  },
  methods: {
    projectList(){
      this.axios({
        url: "/api/v1/project/list",
        method: "get",
        params: {}
      }).then(res => {
        this.projectListData = res.data.data
        console.log(this.projectListData)
      })
    },
    sendProjectId(value) {
      console.log(value)
      this.$forceUpdate()
    }
  },
  mounted() {
    this.projectList()
  }
};
</script>