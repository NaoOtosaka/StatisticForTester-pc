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
        v-for="(item,index) in reversedMessage" :key="index"
        :prop="item.type"
        :label="item.name"
        :sortable="item.sortable"
        :width="item.column"
        show-overflow-tooltip
    >
    </el-table-column>
    <el-table-column
        v-if="data"
        label="操作"
        width="100">
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
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      if (this.data){
        if(this.data.length > 0){
          let item = this.data[0]
          console.log(item)
          let temp = []

          if (item.hasOwnProperty('projectId')) {
            // console.log(1)
            temp.push({
              type: 'projectId',
              name: '项目ID',
              sortable: true,
              column: "150px"
            })
          }
          if (item.hasOwnProperty('projectName')) {
            temp.push({
              type: 'projectName',
              name: '项目名',
              sortable: false,
            })
          }
          if (item.hasOwnProperty('category')) {
            temp.push({
              type: 'category',
              name: '所属项目',
              column: "350px",
              sortable: false
            })
          }
          if (item.hasOwnProperty('planner')) {
            temp.push({
              type: 'planner',
              name: '策划',
              column: "350px",
              sortable: false
            })
          }
          return temp
        }
        else{
          return false
        }
      }
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