<template>
  <el-card style="width: 100%" class="box-card">
    <div slot="header" class="clearfix">
      <span>测试阶段通过率</span>
    </div>
    <div class="text item">
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
  }
}
</script>

<style scoped>

</style>