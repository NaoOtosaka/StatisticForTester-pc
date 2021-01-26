<template>
  <div>
    <el-menu
        default-active="0"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item @click="changeNavStatus">
        <el-button size="mini" class="el-icon-arrow-left" v-if="!isCollapse" type="info" circle></el-button>
        <el-button size="mini" class="el-icon-arrow-right" v-else type="info" circle></el-button>
      </el-menu-item>
      <el-menu-item
          v-for="(item, key) in bannerList"
          :key="key"
          @click="changeNavType(key)"
          :index='key.toString()'>
        {{ item }}
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
      bannerList: [
          '仪表盘',
          '数据',
          '图标',
          '设置'
      ]
    }
  },
  methods: {
    changeNavStatus() {
      this.isCollapse = !this.isCollapse
      this.$emit('sendNavStatus', this.isCollapse)
    },
    changeNavType(index) {
      this.activeIndex = index
      this.$emit('sendNavType', this.activeIndex)
    }
  }

}
</script>
