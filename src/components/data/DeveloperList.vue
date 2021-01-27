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
      if(this.data.length > 0){
        let item = this.data[0]
        console.log(item)
        let temp = []

        if (item.hasOwnProperty('developerId')) {
          // console.log(1)
          temp.push({
            type: 'developerId',
            name: 'ID',
            sortable: true,
            column: "150px"
          })
        }
        if (item.hasOwnProperty('typeId')) {
          // console.log(1)

          temp.push({
            type: 'typeId',
            name: '开发类型',
            sortable: true,
            column: "250px"
          })
        }
        if (item.hasOwnProperty('developerName')) {
          temp.push({
            type: 'developerName',
            name: '姓名',
            sortable: false,
          })
        }
        if (item.hasOwnProperty('developerEmail')) {
          temp.push({
            type: 'developerEmail',
            name: '邮箱',
            sortable: false
          })
        }

        return temp
      }
      else{
        return false
      }
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