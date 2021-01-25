<!--仪表盘主框架-->
<template>
    <el-container>
      <el-aside width="auto">
<!--        纵向导航-->
        <DashBoardNavMenu :isCollapse="navTag"></DashBoardNavMenu>
      </el-aside>
      <el-main>
        <bug :data="bug_data"/>
      </el-main>
    </el-container>
</template>


<style>
.el-header {
  background-color: #545c64;
  color: #545c64;
  line-height:60px;
}
</style>

<script>
import DashBoardNavMenu from "@/components/navmenu/DashBoardNavMenu";
import bug from "@/components/bug";
import Banner from "@/components/Banner";

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