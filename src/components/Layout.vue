<template>
  <div>
    <el-aside width="190px" style="overflow:hidden" >
      <el-row class="tac">
        <el-col :span="12">
          <el-menu
              :default-active="activenev"
              class="el-menu-vertical-demo"
              background-color="#2d3438"
              text-color="#fff"
              style="height:974px;"
              :router="true"
              :collapse="false"
              :default-openeds="defaarray"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>控制台</span>
              </template>
              <el-menu-item index="server">
                <i class="el-icon-upload"></i>
                云服务器</el-menu-item>
              <el-menu-item index="db">
                <i class="el-icon-tickets"></i>
                云数据库
              </el-menu-item>
              <el-menu-item index="domain">
                <i class="el-icon-loading"></i>
                智能负载均衡
              </el-menu-item>
              <el-menu-item index="1-2-1">
                <i class="el-icon-rank"></i>
                域名
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span>用户中心</span>
              </template>
              <el-menu-item index="1-2-1">
                <i class="el-icon-view"></i>
                财务中心
              </el-menu-item>

              <el-menu-item index="1-2-1">
                <i class="el-icon-refresh"></i>
                续费管理

              </el-menu-item>

              <el-menu-item index="1-2-1">
                <i class="el-icon-service"></i>
                工单管理
              </el-menu-item>

              <el-menu-item index="1-2-1">
                <i class="el-icon-setting"></i>
                账号设置
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>

    </el-aside>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activenev:'',
      defaarray:["1","2"]
    }
  },
  methods:{
    splithref(href){
      var href = href.split("http://localhost:8080/user/")
      console.log(href[1])
      return href[1]
    }
  },
  mounted(){
    this.activenev = this.splithref(window.location.href)
  },
}
</script>