<template>
  <div class="Echarts">
    <div id="bugType" style="width: auto;height:300px;"></div>
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
      bugTypeData: []
    }
  },
  methods: {
    getBugCount(){
      axios.all(
          [
            axios.get('/api/v1/tester/bug_type', {
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
      this.bugTypeData=[]
      // 循环读取接口数据
      console.log(res[0].data.data)
      for (let i=0;i<res[0].data.data.length;i++) {
        this.bugTypeData.push({value: res[0].data.data[i][0], name: res[0].data.data[i][1]})
      }
    },
    myEcharts() {
      let myChart = this.echarts.getInstanceByDom(document.getElementById('bugType'))
      // 基于准备好的dom，初始化echarts实例
      if (myChart == null) {
        myChart = this.echarts.init(document.getElementById('bugType'))
      }

      // 指定图表的配置项和数据
      let option = {
        // title: {
        //   left: 'center',
        //   text: 'BUG类型统计'
        // },
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
