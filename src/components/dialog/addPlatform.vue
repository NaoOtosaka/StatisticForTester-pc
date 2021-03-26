<template>
  <el-dialog
      title="新增细分条目"
      :modal-append-to-body="true"
      :append-to-body="true"
      :visible.sync="createDialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="20%">
    <el-form ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="platformDesc"></el-input>
      </el-form-item>
      <el-form-item label="通过率">
        <el-input-number
            v-model="passRate"
            style="width: 100%"
            :precision="2"
            :step="0.01"
            :max="100"
            :min="0"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeDialogStatus">取 消</el-button>
      <el-button type="primary" @click="addPlatformInfo(platformDesc, passRate)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: [
      'projectId',
      'phaseId',
      'createDialogVisible',
  ],
  data() {
    return {
      passRate: 0,
      PlatformListTag: true,
      platformDesc: ""
    }
  },
  methods: {
    initFormData() {
      // 表单数据初始化
      this.passRate = 0
      this.platformDesc = ""
    },
    changeDialogStatus() {
      // 关闭弹窗
      this.$emit('sendDialogStatus', this.createDialogVisible)
      // 初始化表单
      this.initFormData()
    },
    addPlatformInfo(desc, passRate) {
      // 参数封装
      let projectParams = new URLSearchParams()

      passRate = passRate.toFixed(2)

      projectParams.append('phaseId', this.phaseId)
      projectParams.append('desc', desc)
      projectParams.append('passRate', passRate)

      // 接口请求
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/phase_platform",
        method: "post",
        params: projectParams
      }).then(res => {
        // 接口反馈
        if(res.data.status === 1){
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }else{
          this.$message.error(res.data.msg)
        }
        // 更新表渲染
        this.updatePlatformList()
        // 关闭弹窗
        this.changeDialogStatus()
        // 初始化表单数据
        this.initFormData()
      })
    },
    updatePlatformList() {
      this.$emit('updatePlatformList', this.PlatformListTag)
    }
  }
}
</script>

<style scoped>

</style>