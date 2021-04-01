<template>
  <div class="Echarts">
    <div id="passRate" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [
    'projectId',
    'refreshTag'
  ],
  data() {
    return {
      passRateData: [],
      myChart: {},
      planList: [],
      tagList: []
    }
  },
  methods: {
    getPassRateData(){
      axios.all(
          [
            axios.get('/api/v1/project/' + this.projectId + '/pass_rate', {
              params:{
                projectId: this.projectId
              }
            })
          ]
      ).then(res => {
            this.getData(res)
            this.myEcharts()
            this.myResize()
          }
      )
    },
    getData(res) {
      this.planList = res[0].data.data.planList
      this.tagList = res[0].data.data.tagList
      this.passRateData=[]

      let app = {};

      let posList = [
        'left', 'right', 'top', 'bottom',
        'inside',
        'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
        'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
      ]

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }

      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15
      }

      let labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{a} - {c}%',
        fontSize: 16,
        rich: {
          name: {
          }
        }
      }

      for (let i=0;i<this.tagList.length;i++) {
        let countList = []
        for (let v=0;v<this.planList.length;v++){
          countList.push(res[0].data.data.data[this.tagList[i]][this.planList[v]])
        }
        this.passRateData.push(
            {
              name: this.tagList[i],
              type: 'bar',
              label: labelOption,
              data: countList,
              emphasis: {
                focus: 'series'
              }
            },
        )
      }
      console.log(this.passRateData)
    },
    myEcharts() {
      this.myChart = this.echarts.getInstanceByDom(document.getElementById('passRate'))
      // 基于准备好的dom，初始化echarts实例
      if (this.myChart == null) {
        this.myChart = this.echarts.init(document.getElementById('passRate'))
      }

      // 指定图表的配置项和数据
      let option = {
        // title: {
        //   left: 'left',
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: '0%',
          data: this.tagList
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '7%',
          containLabel: true
        },
        toolbox: {
          show: true,
          orient: 'horizontal',
          left: '3%',
          top: 'top',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            // magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: {
          type: 'category',
          axisTick: {show: false},
          data: this.planList
        },
        yAxis: {
          type: 'value',
          max: 100
        },
        series: this.passRateData
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    myResize() {
      window.addEventListener('resize' ,()=>{
        if (this.myChart){
          this.myChart.resize()
        }
      })
    }
  },
  mounted() {
    console.log(this.data)
    this.getPassRateData()
    this.myResize()
  },
  watch: {
    projectId: 'getPassRateData',
    refreshTag: 'getPassRateData'
  }
}
</script>
