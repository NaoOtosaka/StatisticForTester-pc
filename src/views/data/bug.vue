<!--仪表盘主框架-->
<template>
  <div>
    <BugList :data="bug_data"/>
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
      bug_data: []
    }
  },
  methods: {
    bugList(){
      this.axios({
        url: "/api/v1/bug/list",
        method: "get",
        params: {}
      }).then(res => {
        this.bug_data = res.data.data
      })
    }
  },
  mounted() {
    this.bugList()
  }
};
</script>