<!--仪表盘主框架-->
<template>
  <div>
    <TesterList :data="bug_data"/>
  </div>
</template>

<script>
import TesterList from "@/components/data/TesterList";

export default {
  components: {
    TesterList,
  },
  data() {
    return {
      bug_data: []
    }
  },
  methods: {
    test(){
      this.axios({
        url: "/api/v1/tester/list",
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