<!--仪表盘主框架-->
<template>
  <div>
    <Tabs />
    <ProjectList :data="bug_data"/>
  </div>
</template>

<script>
import ProjectList from "@/components/data/ProjectList";
import Tabs from "@/components/base/Tabs";

export default {
  components: {
    ProjectList,
    Tabs
  },
  data() {
    return {
      bug_data: []
    }
  },
  methods: {
    projectList(){
      this.axios({
        url: "/api/v1/project/list",
        method: "get",
        params: {}
      }).then(res => {
        this.bug_data = res.data.data
      })
    }
  },
  mounted() {
    this.projectList()
  }
};
</script>