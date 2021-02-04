<!--仪表盘主框架-->
<template>
  <div>
<!--    <el-row>-->
<!--      <el-col :span="24"><div class="grid-content bg-purple">-->
<!--        <BugCountByDate :testerId="value"/>-->
<!--      </div></el-col>-->
<!--    </el-row>-->
    <el-row>
      <el-col :span="24">
        <div style="float: left">
          <el-select v-model="value" @change="sendProjectId(value)"  clearable placeholder="全部">
            <el-option
                v-for="item in projectListData"
                :key="item.projectId"
                :label="item.projectName"
                :value="item.projectId">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <BugTypeCountWithProject :project-id="value"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BugCountByDate from "@/components/chart/tester/BugCountByDate";
import BugTypeCountWithProject from "@/components/chart/project/BugTypeCountWithProject";

export default {
  components: {
    BugCountByDate,
    BugTypeCountWithProject
  },
  data() {
    return {
      projectListData: [],
      value: ''
    }
  },
  methods: {
    projectList(){
      this.axios({
        url: "/api/v1/project/list",
        method: "get",
        params: {}
      }).then(res => {
        this.projectListData = res.data.data
        console.log(this.projectListData)
      })
    },
    sendProjectId(value) {
      console.log(value)
      this.$forceUpdate()
    }
  },
  mounted() {
    this.projectList()
  }
};
</script>