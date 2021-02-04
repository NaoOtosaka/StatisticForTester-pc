<template>
  <el-menu
      :default-active="navUrl"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router>
    <el-menu-item
        v-for="(item, index) in navList" :key="item.routePath"
        :index="item.routePath">
      <template>
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<!--@click="toUrl(item.routePath)"-->

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  props: ["navList", "isCollapse"],
  data() {
    return {
      navUrl:this.$route.fullPath,
    };
  },
  computed: {
  },
  methods: {
    toUrl(url){
      console.log(url)
      this.$router.push(url)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {
    navList(val){
      this.navList = val
    },
    //监听路由变化
    $route(val){
      //路由如果变化则赋值给初始路由
      for (let i=0;i<this.navList.length;i++){
        if (val.fullPath.indexOf(this.navList[i]["routePath"]) !== -1){
          this.navUrl = this.navList[i]["routePath"]
        }
      }
    }
  }
}
</script>