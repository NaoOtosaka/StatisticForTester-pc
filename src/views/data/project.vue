<!--仪表盘主框架-->
<template>
  <div>
    <Tabs  v-on:sendProjectCategory="test"/>
    <ProjectList :data="bug_data" :loading="loading"/>
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
      category: 3,
      loading: true
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
    setTimeout(() => {
      this.projectList(this.category)
      this.loading = false
    }, 1000)
  }
};
</script>