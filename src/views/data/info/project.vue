<!--仪表盘主框架-->
<template>
  <div>
    <el-page-header @back="goBack" :content="this.projectData['projectName']">
    </el-page-header>
    <br>
    <div style="overflow: hidden;width: 100%">
      <ProjectInfo style="margin-left:2%;width: 23%;box-sizing:border-box;float: left" :projectInfo="projectData"/>
      <BugTypeCountWithProject style="width: 25%;float: left" :projectId="this.$route.query.projectId"/>
      <BugCategoryCountWithProject ref="categoryCharts" style="width: 25%;float: left" :projectId="this.$route.query.projectId"/>
      <BugDeveloperCountWithProject style="width: 25%;float: left" :projectId="this.$route.query.projectId"/>
    </div>
    <div>
      <BugTypeCountWithPhase :projectId="this.$route.query.projectId"/>
    </div>
    <el-row>
      <el-col :span="24">
        <h2>
          阶段BUG汇总
        </h2>
        <br>
        <PhaseList :getChartsRef="getCount" :phaseList="this.projectData['projectPhase']"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectInfo from "@/components/details/ProjectInfo";
import BugTypeCountWithProject from "@/components/chart/project/BugTypeCountWithProject";
import BugCategoryCountWithProject from "@/components/chart/bug/BugCategoryCountWithProject";
import BugDeveloperCountWithProject from "@/components/chart/bug/BugDeveloperCountWithProject";
import PhaseList from "@/components/data/PhaseList";
import BugTypeCountWithPhase from "@/components/chart/project/BugTypeCountWithPhase";

export default {
  components: {
    ProjectInfo,
    BugTypeCountWithProject,
    BugCategoryCountWithProject,
    BugDeveloperCountWithProject,
    PhaseList,
    BugTypeCountWithPhase
  },
  data() {
    return {
      projectData: []
    }
  },
  methods: {
    projectInfo(){
      this.axios({
        url: "/api/v1/project",
        method: "get",
        params: {
          projectId: this.$route.query.projectId
        }
      }).then(res => {
        this.projectData = res.data.data
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    getCount() {
      this.$refs.categoryCharts.getBugCount()
    }
  },
  mounted() {
    this.projectInfo()
  }
};
</script>