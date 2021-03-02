<template>
    <el-table
        :data="bugData"
        border
        width="100%"
        :default-sort = "{order: 'descending'}"
        ref="table"
        stripe>
      <el-table-column
          prop="bugId"
          label="ID"
          sortable
          width="80px">
      </el-table-column>
      <el-table-column
          prop="kbId"
          label="看板ID"
          width="100px">
        <template slot-scope="scope">
          <el-link target="blank" :href="'http://km.pm.netease.com/v6/issues/' + scope.row.kbId" :underline="false">
            {{ scope.row.kbId }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
          prop="bugTitle"
          label="主题"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="bugModel"
          label="模块"
          width="250%"
          sortable
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="bugCategory"
          label="类型"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="bugType"
          label="跟踪标签"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="projectName"
          label="项目名"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="testerName"
          label="QA"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="developerName"
          label="开发"
          sortable
          width="150px"
          show-overflow-tooltip>
      </el-table-column>
<!--      <el-table-column-->
<!--          label="操作"-->
<!--          width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" size="small">查看</el-button>-->
<!--          <el-button type="text" size="small">编辑</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
</template>

<script>
export default {
  props: ["bugData"],
  data() {
    return {
      dataColumn: [],
      tableHeight: 50, //表格高度默认初始值
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