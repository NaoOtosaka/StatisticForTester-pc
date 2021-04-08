<template>
  <el-table
      :data="data"
      border
      width="100%"
      height="100%"
      :default-sort = "{order: 'descending'}"
      ref="table"
      style="overflow-y: hidden;overflow-x: hidden;"
      stripe>
    <el-table-column
        prop="model"
        label="模块名"
        sortable
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="count"
        label="出现次数"
        sortable
        show-overflow-tooltip>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: [
      'data'
  ],
  data() {
    return {
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  background-color: #c7c7c7;
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: #878787;
}

::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: #cecece;
}
</style>