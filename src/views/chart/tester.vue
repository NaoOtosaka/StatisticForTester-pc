<!--仪表盘主框架-->
<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <BugCountWithTester/>
      </div></el-col>
    </el-row>
    <hr style="opacity: 0.3">
    <el-row>
      <el-col :span="24">
        <div style="float: left">
          <el-select v-model="value" @change="sendTesterId(value)" clearable placeholder="全部">
            <el-option
                v-for="item in testerListData"
                :key="item.testerId"
                :label="item.testerName"
                :value="item.testerId">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <BugTypeCountWithTester :testerId="value"/>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">
        <BugCategoryCountWithTester :testerId="value"/>
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple">
        <BugCountByDate :testerId="value"/>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import BugCountWithTester from "@/components/chart/tester/BugCountWithTester";
import BugTypeCountWithTester from "@/components/chart/tester/BugTypeCountWithTester";
import BugCategoryCountWithTester from "@/components/chart/tester/BugCategoryCountWithTester";
import BugCountByDate from "@/components/chart/tester/BugCountByDate";

export default {
  components: {
    BugCountWithTester,
    BugTypeCountWithTester,
    BugCategoryCountWithTester,
    BugCountByDate
  },
  data() {
    return {
      testerListData: [],
      value: ''
    }
  },
  methods: {
    testerList(){
      this.axios({
        url: "/api/v1/tester/list",
        method: "get",
        params: {}
      }).then(res => {
        this.testerListData = res.data.data
        console.log(this.testerListData)
      })
    },
    sendTesterId(value) {
      console.log(value)
      this.$forceUpdate()
    }
  },
  mounted() {
    this.testerList()
  }
};
</script>