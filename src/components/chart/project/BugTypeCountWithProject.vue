<template>
  <div class="Echarts">
    <div id="bugType" style="width: 100%;height:400px;"></div>
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
      bugTypeData: [],
      myChart: {},
    }
  },
  methods: {
    getBugCount(){
      axios.all(
          [
            axios.get('/api/v1/project/bug_type', {
              params:{
                projectId: this.projectId
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
      this.bugTypeData=[]
      // 循环读取接口数据
      console.log(res[0].data.data)
      for (let i=0;i<res[0].data.data.length;i++) {
        this.bugTypeData.push({value: res[0].data.data[i][0], name: res[0].data.data[i][1]})
      }
    },
    myEcharts() {
      this.myChart = this.echarts.getInstanceByDom(document.getElementById('bugType'))
      // 基于准备好的dom，初始化echarts实例
      if (this.myChart == null) {
        this.myChart = this.echarts.init(document.getElementById('bugType'))
      }

      // 指定图表的配置项和数据
      let option = {
        title: {
          left: 'center',
          text: '项目BUG类型占比'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
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
        tooltip: {},
        series: [{
          name: '数量',
          type: 'pie',
          radius: '70%',
          data: this.bugTypeData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
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
