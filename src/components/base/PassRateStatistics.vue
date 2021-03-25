<template>
  <el-card style="width: 100%" class="box-card">
    <div slot="header" class="clearfix">
      <span>测试阶段通过率</span>
    </div>
    <div>
      <el-collapse accordion>
        <el-collapse-item v-model="item.phase_id" v-for="item in this.platformListData" :title="item.plan_name">
          <div>
            <el-table
                empty-text="点击下方新增细分条目"
                :show-header="false"
                :data="item.platform_list"
                style="width: 100%">
              <el-table-column
                  fixed
                  prop="desc"
                  label="描述"
                  show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.desc }}
                </template>
              </el-table-column>
              <el-table-column
                  prop="pass_rate"
                  label="通过率">
                <template slot-scope="scope">
                  {{ "通过率：" + scope.row.pass_rate + "%" }}
                </template>
              </el-table-column>
              <el-table-column
                  fixed="right"
                  width="70%"
                  label="通过率">
                <template slot-scope="scope">
                  <el-button style="border: none" icon="el-icon-edit" size="mini"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 2%">
            <el-button
                style="border: 1px dashed #c6c6c6; width: 100%"
                icon="el-icon-plus"
                size="mini"
                @click="showCreateDialog(item.phase_id)"></el-button>
          </div>
        </el-collapse-item>
        <div>
          <addPlatform
              :projectId="projectId"
              :phaseId="phaseId"
              :createDialogVisible="createDialogVisible"
              v-on:sendDialogStatus="getCreateDialogStatus"/>
        </div>
      </el-collapse>
    </div>
  </el-card>
</template>

<script>
import addPlatform from "@/components/dialog/addPlatform";

export default {
  components: {
    addPlatform,
  },
  props: [
    'projectId'
  ],
  data() {
    return {
      phaseId: null,
      editDialogVisible: false,
      createDialogVisible: false,
      platformListData: []
    }
  },
  methods: {
    showCreateDialog(phaseId) {
      this.createDialogVisible = true
      this.phaseId = phaseId
    },
    platformList(){
      // 阶段细分列表获取
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/phase_platform",
        method: "get"
      }).then(res => {
        this.platformListData = res.data.data
      })
    },
    getCreateDialogStatus(createDialogVisible) {
      this.createDialogVisible = !createDialogVisible
    }
  },
  mounted() {
    this.platformList()
  }
}
</script>

<style scoped>

</style>