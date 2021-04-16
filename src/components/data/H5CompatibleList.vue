<template>
  <el-collapse>
    <el-collapse-item
        v-for="item in phaseList"
        :name="item.phaseId">
      <template slot="title">
        <div style="width: 20%;text-align: left">
          <span style="font-size: medium;">
            <b style="text-align: left">
            {{ item.name }}({{ item.count }})
            </b>
          </span>
        </div>
      </template>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import axios from "axios";

export default {
  props: {},
  components: {
  },
  data() {
    return {
      bugData: {},
      bugCount: {},
    };
  },
  methods: {
    getBugInfo(item) {
      return this.axios({
        url: "/api/v1/bug/list",
        method: "get",
        params: {
          phaseId: item.phaseId
        }
      })
    },
    getBugListWithPhase() {
      // 请求队列初始化
      let req_list = []
      // 阶段序号队列初始化
      let req_num = []
      // 缓存变量
      let temp = this.bugData
      // 判断父组件传值存在性
      if (this.phaseList) {
        // 遍历
        this.phaseList.forEach(item => {
          console.log(item.phaseId)
          // 判断是否已存在当前键
          if (!temp.hasOwnProperty(item.phaseId)) {
            // 填充请求队列
            req_list.push(this.getBugInfo(item))
            req_num.push(item.phaseId)
          }})
      }
      axios.all(req_list).then(axios.spread((...res) => {
            let temp = [...res]
            temp.forEach((item, index) => {
              this.bugData[req_num[index]] = item['data']['data']
              this.bugCount[req_num[index]] = item['data']['data'].length
            })
            setTimeout(() => {
              this.$forceUpdate()
            }, 2000)

          })
      )
    },
  },
  watch: {
    phaseList: 'getBugListWithPhase',
  }
}
</script>