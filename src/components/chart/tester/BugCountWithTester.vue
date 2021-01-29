<template>
  <div class="Echarts">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      xAxis: [],
      count: []
    }
  },
  methods: {
    get_bug_count(){
      axios.all(
          [
              axios.get('/api/v1/tester/bug_count')
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
        this.xAxis.push(res[0].data.data[i][0])
        this.count.push(res[0].data.data[i][1])
      }
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: 'BUG数总览'
        },
        tooltip: {},
        legend: {
          data: ['跟进BUG总数']
        },
        xAxis: {
          data: this.xAxis
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: this.count
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.get_bug_count()
  }
}
</script>

<style>

</style>