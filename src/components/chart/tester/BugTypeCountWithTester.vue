<template>
  <div class="Echarts">
    <div id="bugType" style="width: auto;height:400px;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bugTypeData: []
    }
  },
  methods: {
    getBugCount(){
      axios.all(
          [
            axios.get('/api/v1/tester/bug_type', {
              params:{
                testerId: 1
              }
            })
          ]
      ).then(res => {
            this.getData(res);
            this.myEcharts();
          }
      )
    },
    getData(res) {
      // 循环读取接口数据
      console.log(res[0].data.data)
      for (let i=0;i<res[0].data.data.length;i++) {
        this.bugTypeData.push({value: res[0].data.data[i][1], name: res[0].data.data[i][0]})
      }
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.echarts.init(document.getElementById('bugType'));

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: 'BUG类型统计'
        },
        tooltip: {},
        legend: {
          data: ['跟进BUG总数']
        },
        series: [{
          name: '数量',
          type: 'pie',
          radius: '70%',
          data: this.bugTypeData
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.getBugCount()
  }
}
</script>

<style>

</style>