<!--仪表盘主框架-->
<template>
  <div>
    <Tabs  v-on:sendProjectCategory="test"/>
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
      bug_data: [],
      category: 2
    }
  },
  methods: {
    projectList(category){
      this.axios({
        url: "/api/v1/project/list",
        method: "get",
        params: {
          'categoryId': category
        }
      }).then(res => {
        this.bug_data = res.data.data
      })
    },
    test(category){
      this.projectList(category)
    }
  },
  mounted() {
    this.projectList(this.category)
  }
};
</script>