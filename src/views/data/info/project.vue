<!--仪表盘主框架-->
<template>
  <div>
    <el-row>
      <el-col :span="5" :offset="1">
        <ProjectInfo :projectInfo="projectData"/>
      </el-col>
      <el-col :span="6">
        <BugTypeCountWithProject :projectId="this.$route.query.projectId"/>
      </el-col>
      <el-col :span="6">
        <BugCategoryCountWithProject :projectId="this.$route.query.projectId"/>
      </el-col>
      <el-col :span="6">
        <BugDeveloperCountWithProject :projectId="this.$route.query.projectId"/>
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

export default {
  components: {
    ProjectInfo,
    BugTypeCountWithProject,
    BugCategoryCountWithProject,
    BugDeveloperCountWithProject
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
        params: {projectId: this.$route.query.projectId}
      }).then(res => {
        this.projectData = res.data.data
      })
    }
  },
  mounted() {
    this.projectInfo()
  }
};
</script>