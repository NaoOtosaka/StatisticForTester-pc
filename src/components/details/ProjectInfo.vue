<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>项目基础信息</span>
      <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
    </div>
    <div class="text item">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目ID">
          <el-input v-model="projectData.projectId"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="projectData.projectName"></el-input>
        </el-form-item>
        <el-form-item label="对应策划">
          <el-select v-model="form.region" placeholder="请选择策划">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开发跟进">
<!--          <el-switch v-model="form.delivery"></el-switch>-->
        </el-form-item>

        <el-form-item label="测试跟进">
<!--          <el-input type="textarea" v-model="form.desc"></el-input>-->
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="onSubmit">编辑</el-button>-->
<!--&lt;!&ndash;          <el-button>取消</el-button>&ndash;&gt;-->
<!--        </el-form-item>-->
      </el-form>
    </div>
  </el-card>
</template>


<script>
export default {
  props: [
      'projectInfo'
  ],
  data() {
    return {
      projectData: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    test() {
      this.projectData = this.projectInfo
    }
  },
  mounted() {
    this.test()
  },
  watch: {
    projectInfo: 'test'
  }
}
</script>


<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
