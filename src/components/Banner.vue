<template>
  <div>
    <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item @click="changeNavStatus">
        <el-button size="mini" class="el-icon-arrow-left" v-if="!isCollapse" type="info" circle></el-button>
        <el-button size="mini" class="el-icon-arrow-right" v-else type="info" circle></el-button>
      </el-menu-item>
      <el-menu-item @click="changeNavType(index)" index="1">仪表盘</el-menu-item>
      <el-menu-item @click="changeNavType(index)" index="2">数据</el-menu-item>
      <el-menu-item @click="changeNavType(index)" index="3" >图表</el-menu-item>
      <el-menu-item @click="changeNavType(index)" index="4" >设置</el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeIndex: '1',
    }
  },
  methods: {
    changeNavStatus() {
      this.isCollapse = !this.isCollapse
      this.$emit('sendNavStatus', this.isCollapse)
    },
    changeNavType() {
      console.log(this.$refs)
      this.$emit('sendNavType', this.activeIndex)
    }
  }

}
</script>
