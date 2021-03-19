<!--仪表盘主框架-->
<template>
  <div>
    <el-page-header @back="goBack" :content="this.projectData['projectName']">
    </el-page-header>
    <br>
    <h2>
      测试通过率趋势统计
    </h2>
    <div>
      <PassRateStatistics style="width: 25%;margin-left: 2%"/>
    </div>
    <h2>
      基础异常数据统计
    </h2>
    <br>
    <div style="overflow: hidden;width: 100%">
<!--      <ProjectInfo style="margin-left:2%;width: 25%;box-sizing:border-box;float: left" :projectInfo="projectData"/>-->
      <BugTypeCountWithProject style="margin-left: 5%;width: 45%;float: left" :projectId="this.$route.query.projectId"/>
      <BugCategoryCountWithProject ref="categoryCharts" style="width: 45%;float: left" :projectId="this.$route.query.projectId"/>
<!--      <BugDeveloperCountWithProject style="width: 25%;float: left" :projectId="this.$route.query.projectId"/>-->
    </div>
    <div>
      <BugCountByDate :projectId="this.$route.query.projectId"/>
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
import BugCountByDate from "@/components/chart/project/BugCountByDate";
import PassRateStatistics from "@/components/base/PassRateStatistics";

export default {
  components: {
    ProjectInfo,
    BugTypeCountWithProject,
    BugCategoryCountWithProject,
    BugDeveloperCountWithProject,
    PhaseList,
    BugTypeCountWithPhase,
    BugCountByDate,
    PassRateStatistics
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