<!--仪表盘主框架-->
<template>
  <div>
    <ProjectList :data="bug_data"/>
  </div>
</template>

<script>
import ProjectList from "@/components/data/ProjectList";

export default {
  components: {
    ProjectList,
  },
  data() {
    return {
      bug_data: []
    }
  },
  methods: {
    test(){
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
    this.test()
  }
};
</script>