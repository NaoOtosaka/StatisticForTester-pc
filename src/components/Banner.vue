<template>
  <div>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1">
        <el-button class="el-icon-arrow-left" @click="changeNav" v-if="!isCollapse" type="info" circle></el-button>
        <el-button class="el-icon-arrow-right" @click="changeNav" v-else type="info" circle></el-button>
<!--        <el-switch-->
<!--            active-icon-class="el-icon-arrow-right"-->
<!--            inactive-icon-class="el-icon-arrow-left"-->
<!--            v-model="isCollapse"-->
<!--            inactive-color="#13ce66"-->
<!--            active-color="#ff4949"-->
<!--            @change="changeNav">-->
<!--        </el-switch>-->
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/" style="text-decoration: none;">主页</router-link>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">仪表盘</template>
<!--        <el-menu-item index="3-1">选项1</el-menu-item>-->
<!--        <el-menu-item index="3-2">选项2</el-menu-item>-->
<!--        <el-menu-item index="3-3">选项3</el-menu-item>-->
<!--        <el-submenu index="3-4">-->
<!--          <template slot="title">选项4</template>-->
<!--          <el-menu-item index="3-4-1">选项1</el-menu-item>-->
<!--          <el-menu-item index="3-4-2">选项2</el-menu-item>-->
<!--          <el-menu-item index="3-4-3">选项3</el-menu-item>-->
<!--        </el-submenu>-->
      </el-submenu>
      <el-menu-item index="4" >
        <router-link to="/about" style="text-decoration: none;">设置</router-link>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeIndex: '1',
    }
  },
  methods: {
    changeNav() {
      // console.log(this.isCollapse)
      this.isCollapse = !this.isCollapse
      this.$emit('sendNavTag', this.isCollapse)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }

}
</script>
