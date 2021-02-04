<!--仪表盘主框架-->
<template>
  <div>
    TEST
  </div>
<!--  <bug :data="bug_data"/>-->
</template>

<script>
import DashBoardNavMenu from "@/components/navmenu/DashBoardNavMenu";
import bug from "@/components/bug";
import Banner from "@/components/base/Banner";

export default {
  props:[
      "navTag"
  ],
  components: {
    DashBoardNavMenu,
    bug,
    Banner
  },
  data() {
    return {
      bug_data: []
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
    },
    getNavTag(v) {
      console.log(1)
      this.navTag = v;
    }
  },
  mounted() {
    this.test()
  }
};
</script>