<template>
  <el-upload
      class="upload"
      ref="upload"
      action="#"
      accept=".csv"
      multiple
      :http-request="upload"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false">
    <el-button v-if="status" slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button v-if="!status" slot="trigger" size="small" type="primary" disabled>选取文件</el-button>
    <el-button v-if="status" style="margin-left: 10px;" size="small" @click="clearList" disabled>清空</el-button>
    <el-button v-if="!status" style="margin-left: 10px;" size="small" @click="clearList">清空</el-button>
    <el-button v-if="status" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">录入</el-button>
    <el-button v-if="!status" style="margin-left: 10px;" size="small" type="success" disabled>录入</el-button>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      action: '',
      status: true,
    };
  },
  methods: {
    submitUpload(data) {
      this.changeStatus()
      this.$refs.upload.submit(data);
    },
    handleRemove(file) {
      this.$refs.upload.abort(); //取消上传
      this.$message({message: '成功移除' + file.name, type: 'success'});
    },
    clearList() {
      this.changeStatus()
      this.fileList = []
      // this.$refs.upload.clearFiles()
    },
    watchList() {
      if(this.fileList.length === 0){
        this.status = true
      }
    },
    changeStatus() {
      this.status = !this.status
    },
    upload(data) {
      let params = new FormData(); //创建form对象
      params.append("csvFile", data.file)

      this.axios({
        url: "/api/v1/files/upload",
        method: "post",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: params,
        onUploadProgress: (progressEvent) => {
          let num = progressEvent.loaded / progressEvent.total * 100 | 0;  //百分比
          data.onProgress({percent: num})    //进度条
        }
      }).then(res => {
        if(res.data.status === 1){
          data.onSuccess(); //上传成功(打钩的小图标)
          this.$message({
            message: data.file.name + '导入成功',
            type: 'success'
          })
        }else{
          this.$message.error('系统错误')
        }
        // console.log(params)
        // console.log(res)
      })
    }
  },
  watch :{
    fileList: 'watchList'
  }
}
</script>
