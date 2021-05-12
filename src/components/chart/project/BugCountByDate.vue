<template>
  <div class="Echarts">
    <div id="bugCountByDate" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [
    'projectId'
  ],
  data() {
    return {
      xAxis: [],
      count: [],
    }
  },
  methods: {
    getBugCount(){
      axios.all(
          [
            axios.get('/api/v1/project/bug_trend', {
              params:{
                projectId: this.projectId
              }
            })
          ]
      ).then(res => {
            console.log(res[0].data.data);
            this.getData(this.initDateData(res[0].data.data));
            this.myEcharts();
          }
      )
    },
    initDateData(res) {
      // 数据初始化
      // console.log(res['startDate'])
      let startYear = res['startDate'].substr(0, 4);
      let startMonth = res['startDate'].substr(5, 2);
      let startDay = res['startDate'].substr(8, 2)

      // console.log(res['endDate'])
      let endYear = res['endDate'].substr(0, 4);
      let endMonth = res['endDate'].substr(5, 2);
      let endDay = res['endDate'].substr(8, 2)

      // 设置起止日期
      let date = +this.echarts.number.parseDate(startYear + '-' + startMonth + '-' + startDay);
      let end = +this.echarts.number.parseDate(endYear + '-' + endMonth + '-' + endDay);

      let dayTime = 3600 * 24 * 1000;
      let temp = [];

      // 数据匹配
      for (let time = date; time <= end; time += dayTime) {
        date = this.echarts.format.formatTime('yyyy-MM-dd', time)
        if (res['data'][date]) {
          temp[date] = res['data'][date]
        }else {
          temp[date] = 0;
        }
      }
      return temp
    },
    getData(res) {
      // 数据初始化
      this.xAxis = []
      this.count = []

      // 循环读取接口数据
      for (let item in res) {
        if(res.hasOwnProperty(item)){
          this.xAxis.push(item)
          this.count.push(res[item])
        }
      }
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
          left: 'left',
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '7%',
          containLabel: true
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
        // dataZoom: [{
        //   type: 'inside',
        //   start: 0,
        //   end: 100
        // }, {
        //   start: 0,
        //   end: 10
        // }],
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
    projectId: 'getBugCount'
  }
}
</script>