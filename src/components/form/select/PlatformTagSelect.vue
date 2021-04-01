<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
        v-for="item in tagListData"
        :key="item.id"
        :label="item.name"
        :value="item.name">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: [
    'projectId',
    'value'
  ],
  data() {
    return{
      tagListData: [],
    }
  },
  methods: {
    getTagList() {
      // 参数封装
      let Params = new URLSearchParams()

      Params.append('projectId', this.projectId)

      // 接口请求
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/platform_tag",
        method: "get",
        params: Params
      }).then(res => {
        // 接口反馈
        console.log(res.data.data)
        // 数据处理
        for (let i=0;i<res.data.data.length;i++){
          this.tagListData.push({
            "id": res.data.data[i].tagId,
            "name": res.data.data[i].tagName
          })
        }
        console.log(this.tagListData)
      })
    },
  },
  mounted() {
    this.getTagList()
  }
}
</script>

<style scoped>

</style>