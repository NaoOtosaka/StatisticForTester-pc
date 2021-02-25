<template>
  <el-tabs v-model="activeName" @tab-click="changeCategory(activeName)">
    <el-tab-pane label="游戏学院" name="3"></el-tab-pane>
    <el-tab-pane label="KM" name="2"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: '3'
    };
  },
  methods: {
    changeCategory(category) {
      // console.log(category)
      this.activeName = category
      this.$emit('sendProjectCategory', this.activeName)
    }
  }
};
</script>