<!--仪表盘主框架-->
<template>
  <div>
    <el-page-header @back="goBack" :content="this.projectData['projectName']">
    </el-page-header>
    <br>
    <br>
    <el-card style="width: 100%;padding: 1% 0 1% 0" class="box-card">
      <h2>
        测试通过率统计
      </h2>
      <div>
        <PassRateStatistics
            v-on:refreshChart="refreshChart"
            :projectId="this.$route.query.projectId" 
            style="width: 25%;margin-left: 1%;float: left"/>
      </div>
      <div>
        <PassRateWithProject
            :refreshTag="this.refreshTag"
            :projectId="this.$route.query.projectId" 
            style="width: 70%;margin-left: 2%;float:left;"/>
      </div>
    </el-card>
    <br>
    <el-card style="width: 100%;padding: 1% 0 1% 0" class="box-card">
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
        <BugTypeCountWithPhase :projectId="this.$route.query.projectId"/>
      </div>
      <div>
        <BugCountByDate :projectId="this.$route.query.projectId"/>
      </div>
    </el-card>
    <br>
    <el-card style="width: 100%;padding: 1% 0 1% 0" class="box-card">
      <h2>
        异常模块统计
      </h2>
      <div>
        <ModelList
            style="width: 41%;height: 300px;margin-left: 1%;float: left"
            :data="this.modelData"/>
      </div>
      <div>
        <WordCloud
            style="float: right; width: 55%"
            :projectId="this.$route.query.projectId"/>
      </div>
    </el-card>
    <br>
    <el-card style="width: 100%;" class="box-card">
      <el-row>
        <el-col :span="24">
          <h2>
            阶段BUG汇总
          </h2>
          <br>
          <PhaseList :getChartsRef="getCount" :phaseList="this.projectData['projectPhase']"/>
        </el-col>
      </el-row>
    </el-card>
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
import PassRateWithProject from "@/components/chart/project/PassRateWithProject";
import WordCloud from "@/components/tools/WordCloud";
import ModelList from "@/components/data/ModelList";

export default {
  components: {
    ProjectInfo,
    BugTypeCountWithProject,
    BugCategoryCountWithProject,
    BugDeveloperCountWithProject,
    PhaseList,
    BugTypeCountWithPhase,
    BugCountByDate,
    PassRateStatistics,
    PassRateWithProject,
    WordCloud,
    ModelList
  },
  data() {
    return {
      projectData: [],
      modelData: [],
      refreshTag: null
    }
  },
  methods: {
    refreshChart(refreshTag) {
      this.refreshTag = refreshTag
    },
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
    getModelList() {
      // 接口请求
      this.axios({
        url: "/api/v1/project/" + this.$route.query.projectId + "/model_count",
        method: "get"
      }).then(res => {
        // 接口反馈
        if(res.data.status === 1){
          this.modelData = res.data.data
        }
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
    this.getModelList()
  }
};
</script>