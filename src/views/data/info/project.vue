<!--仪表盘主框架-->
<template>
  <div>
    <el-row>
      <el-page-header @back="goBack" :content="this.projectData['projectName']">
      </el-page-header>
      <br>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5" :offset="1">
        <ProjectInfo :projectInfo="projectData"/>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="6">
        <BugTypeCountWithProject :projectId="this.$route.query.projectId"/>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="6">
        <BugCategoryCountWithProject :projectId="this.$route.query.projectId"/>
      </el-col>
      <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="6">
        <BugDeveloperCountWithProject :projectId="this.$route.query.projectId"/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h2>
          阶段BUG汇总
        </h2>
        <br>
        <PhaseList :phaseList="this.projectData['projectPhase']"/>
      </el-col>
    </el-row>
<!--    <el-row>-->
<!--      <el-col :span="12">-->
<!--        <ProjectInfo :data="bug_data"/>-->
<!--      </el-col>-->
<!--      <el-col :span="12">-->
<!--        <BugCategoryCountWithProject :projectId="value"/>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import ProjectInfo from "@/components/details/ProjectInfo";
import BugTypeCountWithProject from "@/components/chart/project/BugTypeCountWithProject";
import BugCategoryCountWithProject from "@/components/chart/bug/BugCategoryCountWithProject";
import BugDeveloperCountWithProject from "@/components/chart/bug/BugDeveloperCountWithProject";
import PhaseList from "@/components/data/PhaseList";

export default {
  components: {
    ProjectInfo,
    BugTypeCountWithProject,
    BugCategoryCountWithProject,
    BugDeveloperCountWithProject,
    PhaseList
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
    }
  },
  mounted() {
    this.projectInfo()
  }
};
</script>