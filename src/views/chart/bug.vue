<!--仪表盘主框架-->
<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple">
        <BugCountByDate :testerId="value"/>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import BugCountByDate from "@/components/chart/tester/BugCountByDate";

export default {
  components: {
    BugCountByDate,
  },
  data() {
    return {
      testerListData: [],
      value: ''
    }
  },
  // methods: {
  //   testerList(){
  //     this.axios({
  //       url: "/api/v1/tester/list",
  //       method: "get",
  //       params: {}
  //     }).then(res => {
  //       this.testerListData = res.data.data
  //       console.log(this.testerListData)
  //     })
  //   },
  //   sendTesterId(value) {
  //     console.log(value)
  //     this.$forceUpdate()
  //   }
  // },
  // mounted() {
  //   this.testerList()
  // }
};
</script>