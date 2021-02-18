<!--仪表盘主框架-->
<template>
  <div>
    <BugList :bugData="bugData"/>
  </div>
</template>

<script>
import BugList from "@/components/data/BugList";

export default {
  components: {
    BugList,
  },
  data() {
    return {
      bugData: []
    }
  },
  methods: {
    bugList(){
      this.axios({
        url: "/api/v1/bug/list",
        method: "get",
        params: {}
      }).then(res => {
        this.bugData = res.data.data
      })
    }
  },
  mounted() {
    this.bugList()
  }
};
</script>