<template>
  <el-card style="width: 100%" class="box-card">
    <div slot="header" class="clearfix">
      <span>测试阶段通过率</span>
    </div>
    <div>
      <el-collapse accordion>
        <el-collapse-item v-for="item in this.platformListData" :title="item.plan_name">
          <div v-if="item.platform_list">
            <el-table
                stripe
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
                @click="createDialogVisible = true"></el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div>
      <el-dialog
          title="新增细分条目"
          :visible.sync="createDialogVisible"
          width="20%">
        <el-form ref="form" label-width="80px">
          <el-form-item label="名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="持续时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="通过率">
            <el-input-number style="width: 100%" :precision="2" :step="0.01" :max="100" :min="0"></el-input-number>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
export default {
  props: [
    'projectId'
  ],
  data() {
    return {
      editDialogVisible: false,
      createDialogVisible: false,
      platformListData: []
    }
  },
  methods: {
    platformList(){
      // 阶段细分列表获取
      this.axios({
        url: "/api/v1/project/" + this.projectId + "/phase_platform",
        method: "get"
      }).then(res => {
        this.platformListData = res.data.data

        console.log(res.data.data)
      })
    },
  },
  mounted() {
    this.platformList()
  }
}
</script>

<style scoped>

</style>