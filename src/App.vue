<template>
  <div id="app">
    <el-container>
<!--      主banner-->
      <el-header>
        <Banner v-on:sendNavType="getNavType" v-on:sendNavStatus="getNavTag"/>
      </el-header>
<!--        纵向导航-->
      <el-aside width="auto">
        <NavMenu :navList="navList[activeIndex - 1]" :isCollapse="navTag"></NavMenu>
      </el-aside>
<!--        页面视图-->
      <el-container>
        <router-view :navTag="navTag"/>
      </el-container>
    </el-container>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>

<script>
import Banner from "@/components/Banner";
import NavMenu from "@/components/base/NavMenu";

export default {
  components: {
    Banner,
    NavMenu
  },
  data() {
    return {
      navTag: false,
      activeIndex: '1',
      navList: [
        [
          {
            name: "总览",
            routePath: "/dashboard"
          },
          {
            name: "管理",
            routePath: "/dashboard/manage"
          }
        ],
        [
          {
            name: "项目",
            routePath: "/dashboard"
          },
          {
            name: "开发",
            routePath: "/dashboard/manage"
          },
          {
            name: "测试",
            routePath: "/dashboard/manage"
          },
          {
            name: "策划",
            routePath: "/dashboard/manage"
          },
          {
            name: "BUG",
            routePath: "/data/bug"
          },
        ],
        [
          {
            name: "项目图表",
            routePath: "/dashboard"
          },
          {
            name: "开发图表",
            routePath: "/dashboard/manage"
          },
          {
            name: "测试图表",
            routePath: "/dashboard/manage"
          },
          {
            name: "策划图表",
            routePath: "/dashboard/manage"
          },
          {
            name: "BUG图表",
            routePath: "/data/bug"
          },
        ],
        [
          {
            name: "全局",
            routePath: "/dashboard"
          }
        ],
      ]
    }
  },
  methods: {
    getNavTag(navTag) {
      this.navTag = navTag;
    },
    getNavType(navType) {
      this.activeIndex = navType
      console.log(this.activeIndex)
      return navType
    }
  }
};
</script>
