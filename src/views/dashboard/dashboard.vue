<!--仪表盘主框架-->
<template>
  <div style="width: 100%; height: 100%">
    <div style="overflow: hidden; width: 100%; height: 100%" id="lateral">
<!--      <div style="position: relative;margin-left: 1%;width: 75%;float: left">-->
<!--        test-->
<!--      </div>-->
      <div style="position: relative;margin-left: 80%;width: 20%;float: left">
        <h3 style="text-align: left">更新日志</h3>
        <el-card
            style="height: 100%;overflow-y: hidden"
            body-style="margin-right: 10px;padding: 15px 10px 0 5px">
          <Log></Log>
        </el-card>
      </div>
    </div>
  </div>
<!--  <div style="text-align: left">-->
<!--    <h2>仪表盘内容待填充<br></h2>-->
<!--    <hr>-->
<!--    已完成：<br>-->
<!--     - (2021.01.25) 主体框架<br>-->
<!--     - (2021.01.27) 基础数据列表（项目/开发/测试/BUG）<br>-->
<!--     - (2021.02.05) 基础数据展示（项目/测试/BUG）<br>-->
<!--     - (2021.02.19) 项目详情页基础展示<br>-->
<!--     - (2021.02.21) 项目区分KM & 游戏学院<br>-->
<!--     - (2021.03.01) 项目模块增加项目策划案链接、项目提测时间、上线时间、跟进QA（增加填写备注项）<br>-->
<!--     - (2021.03.02) 文件导入入口<br>-->
<!--     - (2021.03.05) bug类型转换为折线图<br>-->
<!--     - (2021.03.07) 项目详情bug类型下拉选择，图表响应更新<br>-->
<!--     - (2021.04.01) 各个项目的阶段测试通过率统计（手动填写、柱状图）<br>-->
<!--     - (2021.04.08) 异常模块统计及对应词云展示实现 <br>-->
<!--     - (2021.05.27) 修复csv导入时间解析异常 <br>-->
<!--     - (2021.05.28) 优化表格加载展示效果 <br>-->
<!--    <hr>-->
<!--    计划中：<br>-->
<!--     - 项目详情按照阶段测试统计bug<br>-->
<!--     - 常见异常关键词统计<br>-->
<!--     - 仪表盘展示优化 <br>-->
<!--     - 项目流程进度展示及控制 <br>-->
<!--     - 用例管理 <br>-->
<!--     - 接口运行及测试 <br>-->
<!--     - 仪表盘展示填充 <br>-->
<!--     - 站点样式翻新优化-->
<!--  </div>-->
</template>

<script>
import Banner from "@/components/base/Banner";
import Log from "@/components/base/Log"

export default {
  props:[
      "navTag"
  ],
  components: {
    Banner,
    Log
  },
  data() {
    return {
      bug_data: []
    }
  },
  methods: {
    getNavTag(v) {
      console.log(1)
      this.navTag = v;
    }
  },
  mounted() {

  }
};
</script>

<style>

</style>