<template>
  <div id="app">
    <el-container>
<!--      主banner-->
      <el-header style="padding: 0">
        <Banner v-on:sendNavType="getNavType" v-on:sendNavStatus="getNavTag" @sendNavType=""/>
      </el-header>
<!--        纵向导航-->
      <el-container>
        <el-aside width="auto">
          <NavMenu :navList="navList[activeIndex]" :isCollapse="navTag"></NavMenu>
        </el-aside>
  <!--        页面视图-->
        <el-main>
          <router-view></router-view>
        </el-main>
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
import Banner from "@/components/base/Banner";
import NavMenu from "@/components/base/NavMenu";

export default {
  components: {
    Banner,
    NavMenu
  },
  data() {
    return {
      navTag: false,
      activeIndex: '0',
      navList: [
        [
          {
            name: "总览",
            routePath: "/dashboard",
            icon: 'el-icon-monitor'
          },
          {
            name: "上传",
            routePath: "/dashboard/upload",
            icon: 'el-icon-upload2'
          },
          // {
          //   name: "词云",
          //   routePath: "/dashboard/test",
          //   icon: 'el-icon-upload2'
          // }
        ],
        [
          {
            name: "项目",
            routePath: "/data/project",
            icon: 'el-icon-bank-card'
          },
          {
            name: "开发",
            routePath: "/data/developer",
            icon: 'el-icon-user'
          },
          {
            name: "测试",
            routePath: "/data/tester",
            icon: 'el-icon-user'
          },
          // {
          //   name: "策划",
          //   routePath: "/data/planner",
          //   icon: 'el-icon-user'
          // },
          {
            name: "BUG",
            routePath: "/data/bug",
            icon: 'el-icon-cpu'
          },
        ],
        [
          {
            name: "项目图表",
            routePath: "/chart/project",
            icon: 'el-icon-pie-chart'
          },
          // {
          //   name: "开发图表",
          //   routePath: "/chart/developer",
          //   icon: 'el-icon-pie-chart'
          // },
          {
            name: "测试图表",
            routePath: "/chart/tester",
            icon: 'el-icon-pie-chart'
          },
          // {
          //   name: "策划图表",
          //   routePath: "/chart/planner",
          //   icon: 'el-icon-pie-chart'
          // },
          {
            name: "BUG图表",
            routePath: "/chart/bug",
            icon: 'el-icon-pie-chart'
          },
        ],
        // [
        //   {
        //     name: "全局",
        //     routePath: "/dashboard",
        //     icon: 'el-icon-setting'
        //   }
        // ],
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
  },
  watch: {
    $route(val){
      //路由如果变化则赋值给初始路由
      for (let i=0;i<this.navList.length;i++){
        let tag = this.navList[i][0]["routePath"].indexOf('/', 1)
        if (val.fullPath.indexOf(this.navList[i][0]["routePath"].substr(0, tag)) !== -1){
          this.activeIndex = i
        }
      }
    }
  }
};
</script>
