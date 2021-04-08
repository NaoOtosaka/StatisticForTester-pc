<!--仪表盘主框架-->
<template>
  <div style="text-align: left">
    <h2>仪表盘内容待填充<br></h2>
    <hr>
    已完成：<br>
     - (2021.01.25) 主体框架<br>
     - (2021.01.27) 基础数据列表（项目/开发/测试/BUG）<br>
     - (2021.02.05) 基础数据展示（项目/测试/BUG）<br>
     - (2021.02.19) 项目详情页基础展示<br>
     - (2021.02.21) 项目区分KM & 游戏学院<br>
     - (2021.03.01) 项目模块增加项目策划案链接、项目提测时间、上线时间、跟进QA（增加填写备注项）<br>
     - (2021.03.02) 文件导入入口<br>
     - (2021.03.05) bug类型转换为折线图<br>
     - (2021.03.07) 项目详情bug类型下拉选择，图表响应更新<br>
     - (2021.04.01) 各个项目的阶段测试通过率统计（手动填写、柱状图）<br>
     - (2021.04.08) 异常模块统计及对应词云展示实现 <br>
    <hr>
    待制作：<br>
     - 数据图表填充<br>
     - 项目详情页数据展示<br>
     - ...
    <hr>
    计划中：<br>
     - 项目详情按照阶段测试统计bug<br>
     - 常见异常关键词统计<br>
     - 仪表盘展示优化
  </div>
<!--  <bug :data="bug_data"/>-->
</template>

<script>
import bug from "@/components/bug";
import Banner from "@/components/base/Banner";

export default {
  props:[
      "navTag"
  ],
  components: {
    bug,
    Banner
  },
  data() {
    return {
      bug_data: []
    }
  },
  methods: {
    test(){
      this.axios({
        url: "/api/v1/bug/list",
        method: "get",
        params: {}
      }).then(res => {
        this.bug_data = res.data.data
      })
    },
    getNavTag(v) {
      console.log(1)
      this.navTag = v;
    }
  },
  mounted() {
    this.test()
  }
};
</script>