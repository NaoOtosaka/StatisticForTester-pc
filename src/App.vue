<template>
  <div id="app">
    <el-container>
<!--      主banner-->
      <el-header>
        <Banner v-on:sendNavType="getNavTag" v-on:sendNavStatus="getNavTag"/>
      </el-header>
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

export default {
  components: {
    Banner
  },
  data() {
    return {
      navTag: false,
      activeIndex: '1'
    }
  },
  methods: {
    getNavTag(v) {
      console.log(1)
      this.navTag = v;
    },

  }
};
</script>
