<template>
  <div class="Echarts">
    <div id="bugPhaseType" style="width: 100%;height:400px;"></div>
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
      data: [],
      myChart: {},
      planList: [],
      typeList: []
    }
  },
  methods: {
    getBugCount(){
      axios.all(
          [
            axios.get('/api/v1/project/bug_phase_type', {
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
      this.typeList = res[0].data.data.typeList
      this.bugTypeData=[]
      // console.log(this.typeList)
      // console.log(this.typeList.length)
      for (let i=0;i<this.typeList.length;i++) {
        // console.log(res[0].data.data.data[this.typeList[i]])
        let countList = []
        for (let v=0;v<this.planList.length;v++){
          countList.push(res[0].data.data.data[this.typeList[i]][this.planList[v]])
        }
        // console.log(countList)
        this.data.push(
            {
              name: this.typeList[i],
              type: 'line',
              data: countList
            },
        )
      }
      // console.log(this.data)
    },
    myEcharts() {
      this.myChart = this.echarts.getInstanceByDom(document.getElementById('bugPhaseType'))
      // 基于准备好的dom，初始化echarts实例
      if (this.myChart == null) {
        this.myChart = this.echarts.init(document.getElementById('bugPhaseType'))
      }

      // 指定图表的配置项和数据
      let option = {
        title: {
          left: 'left',
          text: 'BUG类型趋势统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '0%',
          data: this.typeList
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '7%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.planList
        },
        yAxis: {
          type: 'value'
        },
        series: this.data
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
    this.getBugCount()
    this.myResize()
  },
  watch: {
    projectId: 'getBugCount'
  }
}
</script>
