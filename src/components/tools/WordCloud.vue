<template>
  <div id="word-img">
    <el-image :src="'data:image/png;base64,'+pic">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: '',
      pic: "",
      pageTitle: 'Flask Vue Word Cloud',
    }
  },
  methods: {
    getWordCloud() {
      this.axios.get("/api/v1/tools/wordcloud", {
        params:{
          projectId: 2
        }
      }).then(
          res => {
            this.pic = res.data
            // console.log(res.data)
          }
      ).catch(res => {
        console.log(res.data.res)
      })
    },
    onDownload() {
      const imgUrl = 'data:image/png;base64,' + this.pic
      const a = document.createElement('a')
      a.href = imgUrl
      a.setAttribute('download', 'word-cloud')
      a.click()
    }
  },
  mounted() {
    this.getWordCloud()
  }
}
</script>

<style scoped>
#word-img {
  width: 800px;
  height: 300px;
  margin: 20px;
}
</style>