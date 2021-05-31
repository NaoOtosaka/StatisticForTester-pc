<template>
  <div class="block">
    <el-timeline style="padding-inline-start: 10px">
      <el-timeline-item
          v-for="item in this.logList"
          :timestamp="item.commitTime"
          placement="top">
        <el-card body-style="padding: 5px">
          <h4 style="margin: 10px; text-align: left">{{ item.content }}</h4>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "Log",
  data() {
    return {
      logList: []
    }
  },
  methods: {
    getLogList() {
      this.axios({
        url: "/api/v1/log/",
        method: "get"
      }).then(res => {
        console.log(res.data.data)
        this.logList = res.data.data
      })
    },
  },
  mounted() {
    this.getLogList()
  }
}
</script>

<style scoped>

</style>