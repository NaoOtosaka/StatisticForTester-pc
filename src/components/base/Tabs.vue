<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="KM" name="KM"></el-tab-pane>
    <el-tab-pane label="游戏学院" name="gameAcademy"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'KM'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>