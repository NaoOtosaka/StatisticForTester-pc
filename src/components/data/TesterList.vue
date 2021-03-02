<template>
  <el-table
      :data="data"
      border
      width="100%"
      :height="tableHeight"
      :default-sort = "{order: 'descending'}"
      ref="table"
      stripe>
    <el-table-column
        prop="testerId"
        label="ID"
        sortable
        width="150px"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="testerName"
        label="姓名"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="testerEmail"
      label="邮箱"
      show-overflow-tooltip>
  </el-table-column>
<!--    <el-table-column-->
<!--        label="操作"-->
<!--        width="100">-->
<!--      <template slot-scope="scope">-->
<!--        <el-button type="text" size="small">查看</el-button>-->
<!--        <el-button type="text" size="small">编辑</el-button>-->
<!--      </template>-->
<!--    </el-table-column>-->
  </el-table>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      dataColumn: [],
      tableHeight: 50 //表格高度默认初始值
    }
  },
  mounted:function(){
    this.$nextTick(function () {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 50;

      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 50
      }
    })
    //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
    //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
  }
}
</script>