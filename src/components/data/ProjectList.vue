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
        prop="projectId"
        label="项目ID"
        sortable
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="projectName"
        label="项目名"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="doc_url"
        label="文档地址"
        width="700px"
        show-overflow-tooltip>
      <template slot-scope="scope">
        <el-input v-model="input" style="width: 90%" placeholder="请输入内容"></el-input>
        <el-button type="text" style="float: right">编辑</el-button>
      </template>
    </el-table-column>
    <el-table-column
        prop="planner"
        label="策划"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="tester"
        label="跟进QA"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="test_time"
        label="提测时间"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        prop="publish_time"
        label="上线时间"
        show-overflow-tooltip>
    </el-table-column>
    <el-table-column
        v-if="data"
        label="操作"
    >
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="toInfoUrl(scope.row.projectId)">查看详情</el-button>
<!--        <el-button type="text" size="small">编辑</el-button>-->
      </template>
    </el-table-column>
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
  methods: {
    toInfoUrl(projectId){
      // console.log(projectId)
      this.$router.push({path:'/data/project/info', query:{projectId: projectId}})
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