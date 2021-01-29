<!--仪表盘主框架-->
<template>
  <div>
    <TesterTotal/>
  </div>
</template>

<script>
import TesterTotal from "@/components/chart/tester/BugCountWithTester";

export default {
  components: {
    TesterTotal,
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