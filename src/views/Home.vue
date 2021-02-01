<template>
    <el-container>
      <el-header class="el-header">
        <Banner v-on:sendNavTag="getNavTag"/>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <NavMenu :isCollapse=navTag></NavMenu>
        </el-aside>
      </el-container>
      <bug :data="bug_data"/>
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
import NavMenu from "@/components/base/NavMenu";
import bug from "@/components/bug";
import Banner from "@/components/base/Banner";

export default {
  components: {
    NavMenu,
    bug,
    Banner
  },
  data() {
    return {
      bug_data: [],
      navTag: false
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