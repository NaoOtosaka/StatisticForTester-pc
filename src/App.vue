<template>
  <div id="app">
    <el-container>
      <el-header>
        <Banner v-on:sendNavTag="getNavTag"/>
      </el-header>
      <el-container>
        <el-aside style="width: auto">
          <NavMenu :isCollapse=navTag></NavMenu>
        </el-aside>
        <el-main>
          <router-view/>
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
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import NavMenu from "@/components/NavMenu";
import Banner from "@/components/Banner";

export default {
  components: {
    NavMenu,
    Banner
  },
  data() {
    return {
      navTag: false
    }
  },
  methods: {
    getNavTag(v) {
      console.log(1)
      this.navTag = v;
    }
  }
};
</script>
