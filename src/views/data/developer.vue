<!--仪表盘主框架-->
<template>
  <div>
    <DeveloperList :data="bug_data"/>
  </div>
</template>

<script>
import DeveloperList from "@/components/data/DeveloperList";

export default {
  components: {
    DeveloperList,
  },
  data() {
    return {
      bug_data: []
    }
  },
  methods: {
    test(){
      this.axios({
        url: "/api/v1/developer/list",
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