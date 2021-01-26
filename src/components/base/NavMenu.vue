<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse">
    <el-menu-item
        v-for="(item,index) in navList" :key="index"
        @click="toUrl(item.routePath)">
      <i class="el-icon-setting"></i>
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>


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
    };
  },
  computed: {
  },
  methods: {
    toUrl(url){
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
      console.log(this.navList)
      this.navList = val
    }
  }
}
</script>