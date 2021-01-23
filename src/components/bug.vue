<template>
  <div>
<!--    {{ reversedMessage }}-->
    <el-table
        :data="data"
        border
        height="1080px"
        width="100%"
        :default-sort = "{order: 'descending'}"
        stripe
        >
      <el-table-column v-for="(item,index) in reversedMessage" :key="index"
          :prop="item.type"
          :label="item.name"
          :sortable="item.sortable"
          :width="item.column"
          show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      dataColumn: []
    }
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      if(this.data.length > 0){
        // `this` 指向 vm 实例
        let item = this.data[0]
        console.log(item)
        let temp = []

        if (item.hasOwnProperty('bugId')) {
          // console.log(1)
          temp.push({
            type: 'bugId',
            name: 'ID',
            sortable: true,
            column: "150px"
          })
        }
        if (item.hasOwnProperty('kbId')) {
          temp.push({
            type: 'kbId',
            name: '看板ID',
            sortable: false,
            column: "150px"
          })
        }
        if (item.hasOwnProperty('bugTitle')) {
          temp.push({
            type: 'bugTitle',
            name: '主题',
            sortable: false
          })
        }
        if (item.hasOwnProperty('bugModel')) {
          temp.push({
            type: 'bugModel',
            name: '模块',
            sortable: true,
            column: "400px"
          })
        }
        if (item.hasOwnProperty('projectName')) {
          temp.push({
            type: 'projectName',
            name: '项目名',
            sortable: true,
            column: "200px"
          })
        }
        if (item.hasOwnProperty('testerName')) {
          temp.push({
            type: 'testerName',
            name: 'QA',
            sortable: true,
            column: "200px"
          })
        }
        if (item.hasOwnProperty('developerName')) {
          temp.push({
            type: 'developerName',
            name: '开发',
            sortable: true,
            column: "200px"
          })
        }

        return temp
      }
      else{
        return false
      }
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>