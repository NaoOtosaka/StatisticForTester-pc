<template>
  <div>
      <bug :data="bug_data"/>
  </div>
</template>


<script>
import bug from "@/components/bug";

export default {
  components: {
    bug
  },
  data() {
    return {
      bug_data: [],
      isCollapse: false
    }
  },
  methods: {
    test(){
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
    this.test()
  }
}

</script>