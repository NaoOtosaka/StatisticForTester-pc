<template>
  <el-dialog
      title="编辑细分条目"
      :modal-append-to-body="true"
      :append-to-body="true"
      :visible.sync="editDialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="20%">
    <el-form ref="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="desc"></el-input>
      </el-form-item>
      <el-form-item label="通过率">
        <el-input-number v-model="passRate" style="width: 100%" :precision="2" :step="0.01" :max="100" :min="0"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeDialogStatus">取 消</el-button>
      <el-button type="primary" @click="editPlatformInfo(platformId, desc, passRate)">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: [
    'projectId',
    'platformId',
    'desc',
    'passRate',
    'editDialogVisible',
  ],
  data() {
    return {
      PlatformListTag: true,
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
      this.$emit('sendDialogStatus', this.editDialogVisible)
      // 初始化表单
      this.initFormData()
    },
    editPlatformInfo(platformId, desc, passRate) {
      // 参数封装
      let projectParams = new URLSearchParams()

      passRate = passRate.toFixed(2)

      projectParams.append('platformId', this.platformId)
      projectParams.append('desc', desc)
      projectParams.append('passRate', passRate)

      // 接口请求
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/phase_platform",
        method: "put",
        params: projectParams
      }).then(res => {
        // 接口反馈
        if(res.data.status === 1){
          this.$message({
            message: '修改成功',
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