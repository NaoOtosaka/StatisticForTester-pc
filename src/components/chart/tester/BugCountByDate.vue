<template>
  <div class="Echarts">
    <div id="bugCountByDate" style="width: auto;height:400px;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [
    'testerId'
  ],
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
            axios.get('/api/v1/tester/bug_trend', {
              params:{
                testerId: this.testerId
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
      // 数据初始化
      this.xAxis = []
      this.count = []

      // 循环读取接口数据
      console.log(res[0].data.data)
      for (let i=0;i<res[0].data.data.length;i++) {
        this.xAxis.push(this.formatDate(res[0].data.data[i][0] * 1000))
        this.count.push(res[0].data.data[i][1])
      }
    },
    formatDate(time) {
      // 时间戳标准化
      let date = new Date(parseInt(time));
      let year = date.getFullYear();
      let mon = date.getMonth()+1;
      let day = date.getDate();
      let hour = date.getHours()
      return year+'/'+mon+'/'+day+'-'+hour+':00';
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.echarts.getInstanceByDom(document.getElementById('bugCountByDate'))

      if (myChart == null) {
        myChart = this.echarts.init(document.getElementById('bugCountByDate'))
      }

      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '异常新增趋势',
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 10
        }],
        series: [
          {
            name: '新增异常',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }])
            },
            data: this.count
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.getBugCount()
  },
  watch: {
    testerId: 'getBugCount'
  }
}
</script>