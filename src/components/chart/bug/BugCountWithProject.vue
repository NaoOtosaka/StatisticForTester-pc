<template>
  <drawCharts
      :stylee="stylee"
      :option=myEcharts()
  ></drawCharts>
</template>

<script>
import drawCharts from "@/components/base/drawCharts";
import axios from "axios";

export default {
  components: {
    drawCharts
  },
  data() {
    return {
      id: 'test',
      xAxis: [],
      count: [],
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }]
      },
      stylee: {
        width: '500px',
        height: '600px'
      }
    }
  },
  methods: {
    getBugCount(){
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
      // 指定图表的配置项和数据
      this.option.xAxis.data = this.xAxis
      this.option.series[0].data = this.count
      return this.option
    }
  },
  mounted() {
    this.getBugCount()
  }
}
</script>

<style>

</style>