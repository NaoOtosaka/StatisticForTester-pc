<!--仪表盘主框架-->
<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple">
        <BugCountByDate :testerId="value"/>
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">
        <BugTypeCountWithTester/>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">
        <BugCategoryCountWithTester/>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">
        <BugCountByEnv/>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import BugCountByDate from "@/components/chart/tester/BugCountByDate";
import BugTypeCountWithTester from "@/components/chart/tester/BugTypeCountWithTester";
import BugCategoryCountWithTester from "@/components/chart/tester/BugCategoryCountWithTester";
import BugCountByEnv from "@/components/chart/tester/BugCountByEnv";


export default {
  components: {
    BugCountByDate,
    BugTypeCountWithTester,
    BugCategoryCountWithTester,
    BugCountByEnv
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