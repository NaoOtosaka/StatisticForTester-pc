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
                :show-header="false"
                :data="item.platform_list"
                style="width: 100%">
              <el-table-column
                  prop="desc"
                  label="描述"
                  width="150%">
                <template slot-scope="scope">
                  {{ scope.row.desc }}
                </template>
              </el-table-column>
              <el-table-column
                  prop="pass_rate"
                  label="通过率"
                  width="130%">
                <template slot-scope="scope">
                  {{ "通过率：" + scope.row.pass_rate + "%" }}
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button icon="el-icon-edit" size="mini"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top: 2%">
            <el-button style="border: 1px dashed #c6c6c6; width: 100%" icon="el-icon-plus" size="mini"></el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
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
      platformListData: []
    }
  },
  methods: {
    platformList(){
      // 测试人员列表获取
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