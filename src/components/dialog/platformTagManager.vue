<template>
  <el-dialog
      title="细分标签管理"
      :modal-append-to-body="true"
      :append-to-body="true"
      :visible.sync="TagManagerDialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="20%"
      style="height: auto">
    <el-table
        empty-text="点击下方新增细分条目"
        :show-header="false"
        :data="this.tagListData"
        style="width: 100%">
      <el-table-column
          fixed
          prop="name"
          label="标签名"
          show-overflow-tooltip>
        <template slot-scope="scope">
        <span v-if="tagEditTag === false && editIndex !== scope.row.id" style="width: 95%">
          {{ scope.row.name }}
        </span>
        <el-input
            v-if="tagEditTag && editIndex === scope.row.id"
            v-model="scope.row.name"
            style="width: 95%;"
            :placeholder="scope.row.name">
        </el-input>
          <el-input
              v-if="tagCreateTag && editIndex === scope.row.id"
              v-model="scope.row.name"
              style="width: 95%;"
              :placeholder="scope.row.name">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          width="80%"
          label="操作">
        <template slot-scope="scope">
          <el-button
              v-if="tagEditTag === false && tagCreateTag === false"
              style="border: none; padding: 7px 5px"
              icon="el-icon-edit"
              size="mini"
              @click="changeEditStatus(scope.row.id)"></el-button>
          <el-button
              v-if="tagEditTag && editIndex === scope.row.id"
              style="border: none; padding: 7px 5px"
              icon="el-icon-check"
              size="mini"
              @click="editPlatformTag(scope.row.id, scope.row.name)"></el-button>
          <el-button
              v-if="tagCreateTag && editIndex === scope.row.id"
              style="border: none; padding: 7px 5px"
              icon="el-icon-check"
              size="mini"
              @click="addPlatformTag(scope.row.name)"></el-button>
          <el-button
              v-if="tagEditTag === false && tagCreateTag === false"
              style="border: none; padding: 7px 5px"
              icon="el-icon-delete"
              size="mini"
              @click="openDeleteMessageBox(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 2%">
      <el-button
          style="border: 1px dashed #c6c6c6; width: 100%"
          icon="el-icon-plus"
          size="mini"
          @click="addBlankTagData()"
      ></el-button>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="changeDialogStatus">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: [
    'projectId',
    'phaseId',
    'TagManagerDialogVisible',
  ],
  data() {
    return {
      platformListTag: true,
      tagListData: [],
      tagEditTag: false,
      tagCreateTag: false,
      editIndex: -1
    }
  },
  methods: {
    changeDialogStatus() {
      // 初始化弹窗状态
      this.tagCreateTag = false
      this.tagEditTag = false
      this.editIndex = -1
      // 关闭弹窗
      this.$emit('sendDialogStatus', this.TagManagerDialogVisible)
    },
    initData() {
      this.tagListData = []
      this.getTagList()
    },
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
        })
    },
    changeEditStatus(index) {
      // 设置编辑态
      this.tagEditTag = !this.tagEditTag
      this.editIndex = index
    },
    changeCreateStatus() {
      this.tagCreateTag = !this.tagCreateTag
      this.editIndex = null
    },
    editPlatformTag(tagId, tagName) {
      // 参数封装
      let projectParams = new URLSearchParams()

      projectParams.append('tagId', tagId)
      projectParams.append('tagName', tagName)

      // 接口请求
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/platform_tag",
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
        // 切换编辑态
        this.changeEditStatus()
        // 更新表渲染
        this.initData()
      })
    },
    openDeleteMessageBox(tagId) {
      this.$confirm('确认删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletePlatformTag(tagId)
      })
    },
    deletePlatformTag(tagId) {
      // 参数封装
      let projectParams = new URLSearchParams()

      projectParams.append('tagId', tagId)

      // 接口请求
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/platform_tag",
        method: "delete",
        params: projectParams
      }).then(res => {
        // 接口反馈
        if(res.data.status === 1){
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }else{
          this.$message.error(res.data.msg)
        }
        // 更新表渲染
        this.updatePlatformTagList()
      })
    },
    updatePlatformTagList() {
      this.initData()
    },
    addBlankTagData() {
      this.tagListData.push({
        "id": null,
        "name": ''
      })
      this.changeCreateStatus()
    },
    addPlatformTag(name) {
      // 参数封装
      let projectParams = new URLSearchParams()

      projectParams.append('tagName', name)

      // 接口请求
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/platform_tag",
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
        this.initData()
        // 更新创建标签状态
        this.changeCreateStatus()
      })
    },
  },
  mounted() {
    this.initData()
    console.log(this.tagListData)
  },
  watch: {
    TagManagerDialogVisible: "initData"
  }
}
</script>
