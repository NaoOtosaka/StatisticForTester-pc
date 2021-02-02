<template>
  <div class="Echarts">
    <div id="bugCount" style="width: auto;height:400px;"></div>
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
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.echarts.init(document.getElementById('bugCount'));

      // 指定图表的配置项和数据
      let option = {
        title: {
          text: 'BUG数总览'
        },
        tooltip: {},
        xAxis: {
          data: this.xAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#ffffff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#000000'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [{
          showBackground: true,
          itemStyle: {
            color: this.echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#188df0'}
                ]
            )
          },
          emphasis: {
            itemStyle: {
              color: this.echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#3E4FFC'}
                  ]
              )
            }
          },
          name: '跟进BUG数',
          type: 'bar',
          data: this.count,
          barWidth: 50
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
  mounted() {
    this.getBugCount()
  }
}
</script>
