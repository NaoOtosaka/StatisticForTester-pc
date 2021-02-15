<!--设置页面主框架-->
<template>
  <el-container>
    <el-aside width="auto">
      <!--        纵向导航-->
    </el-aside>
    <el-main>
      <bug :data="bug_data"/>
    </el-main>
  </el-container>
</template>


<script>
import bug from "@/components/bug";
import Banner from "@/components/base/Banner";

export default {
  props:[
    "navTag"
  ],
  components: {
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