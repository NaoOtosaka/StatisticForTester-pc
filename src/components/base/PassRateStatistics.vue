<template>
  <el-card style="width: 100%; height: 400px;overflow-y: auto;overflow-x: hidden;" class="box-card">
    <div slot="header" class="clearfix">
      <span style="float: left">阶段通过率汇总</span>
      <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="showTagManagerDialog">细分标签编辑</el-button>
    </div>
    <div class="text item">
      <el-collapse accordion>
        <el-collapse-item v-for="item in this.platformListData" :title="item.planName">
          <div>
            <el-table
                empty-text="点击下方新增细分条目"
                :show-header="false"
                :data="item.platformList"
                style="width: 100%; height: 100%">
              <el-table-column
                  fixed
                  prop="desc"
                  label="描述"
                  show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.tagName }}
                </template>
              </el-table-column>
              <el-table-column
                  prop="passRate"
                  label="通过率">
                <template slot-scope="scope">
                  {{ "通过率:" + scope.row.passRate + "%" }}
                </template>
              </el-table-column>
              <el-table-column
                  fixed="right"
                  width="80%"
                  label="操作">
                <template slot-scope="scope">
                  <el-button
                      style="border: none; padding: 7px 5px"
                      icon="el-icon-edit"
                      size="mini"
                      @click="showEditDialog(
                          scope.row.platformId,
                          scope.row.desc,
                          scope.row.passRate,
                          scope.row.tagId,
                          scope.row.tagName)"></el-button>
                  <el-button
                      style="border: none; padding: 7px 5px"
                      icon="el-icon-delete"
                      size="mini"
                      @click="openDeleteMessageBox(scope.row.platformId)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 2%">
            <el-button
                style="border: 1px dashed #c6c6c6; width: 100%"
                icon="el-icon-plus"
                size="mini"
                @click="showCreateDialog(item.phaseId)"
            ></el-button>
          </div>
        </el-collapse-item>
        <div>
          <addPlatform
              :projectId="projectId"
              :phaseId="phaseId"
              :createDialogVisible="createDialogVisible"
              v-on:sendDialogStatus="getCreateDialogStatus"
              v-on:updatePlatformList="updatePlatformList"
              v-on:refreshChart="refreshChart"/>
        </div>
        <div>
          <edit-platform
              :projectId="projectId"
              :platformId="platformId"
              :tagId="tagId"
              :tagName="tagName"
              :passRate="passRate"
              :editDialogVisible="editDialogVisible"
              v-on:sendDialogStatus="getEditDialogStatus"
              v-on:updatePlatformList="updatePlatformList"
              v-on:refreshChart="refreshChart"/>
        </div>
        <div>
          <platformTagManager
              :projectId="projectId"
              :TagManagerDialogVisible="TagManagerDialogVisible"
              v-on:sendDialogStatus="getTagManagerDialogStatus"
              v-on:refreshChart="refreshChart"/>
        </div>
      </el-collapse>
    </div>
  </el-card>
</template>

<script>
import addPlatform from "@/components/dialog/addPlatform";
import editPlatform from "@/components/dialog/editPlatform";
import platformTagManager from "@/components/dialog/platformTagManager";

export default {
  components: {
    addPlatform,
    editPlatform,
    platformTagManager
  },
  props: [
    'projectId'
  ],
  data() {
    return {
      phaseId: null,
      platformId: null,
      tagId: null,
      tagName: null,
      desc: null,
      passRate: null,
      editDialogVisible: false,
      createDialogVisible: false,
      TagManagerDialogVisible: false,
      platformListData: [],
      refreshTag: true
    }
  },
  methods: {
    refreshChart() {
      this.refreshTag = !this.refreshTag
      this.$emit('refreshChart', this.refreshTag)
    },
    showCreateDialog(phaseId) {
      this.createDialogVisible = true
      this.phaseId = phaseId
    },
    showEditDialog(platformId, desc, passRate, tagId, tagName) {
      this.editDialogVisible = true
      this.platformId = platformId
      this.desc = desc
      this.passRate = passRate
      this.tagId = tagId
      this.tagName = tagName
    },
    showTagManagerDialog() {
      this.TagManagerDialogVisible = true
    },
    platformList(){
      // 阶段细分列表获取
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/phase_platform",
        method: "get"
      }).then(res => {
        this.platformListData = res.data.data
        console.log(this.platformListData)
      })
    },
    openDeleteMessageBox(platformId) {
      this.$confirm('确认删除吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletePlatformInfo(platformId)
        this.refreshChart()
      })
    },
    deletePlatformInfo(platformId) {
      // 参数封装
      let projectParams = new URLSearchParams()

      projectParams.append('platformId', platformId)

      // 接口请求
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/phase_platform",
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
        this.updatePlatformList()
        // 关闭弹窗
        this.changeDialogStatus()
        // 初始化表单数据
        this.initFormData()
      })
    },
    getCreateDialogStatus(createDialogVisible) {
      this.createDialogVisible = !createDialogVisible
    },
    getEditDialogStatus(editDialogVisible) {
      this.editDialogVisible = !editDialogVisible
    },
    getTagManagerDialogStatus(TagManagerDialogVisible) {
      this.TagManagerDialogVisible = !TagManagerDialogVisible
    },
    updatePlatformList() {
      this.platformList()
    }
  },
  mounted() {
    this.platformList()
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  background-color: #c7c7c7;
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: #878787;
}

::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: #cecece;
}
</style>