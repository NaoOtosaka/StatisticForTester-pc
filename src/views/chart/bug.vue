<!--仪表盘主框架-->
<template>
  <div>
    <BugCountWithProject/>
  </div>
</template>

<script>
import BugCountWithProject from "@/components/chart/bug/BugCountWithProject";

export default {
  components: {
    BugCountWithProject,
  },
  data() {
    return {
      // bug_data: []
    }
  },
  methods: {
    // bug_count(){
    //   this.axios({
    //     url: "/api/v1/tester/bug_count",
    //     method: "get",
    //     params: {}
    //   }).then(res => {
    //     this.bug_data = res.data.data
    //   })
    // }
  },
  mounted() {
    // this.bug_count()
  }
};
</script>