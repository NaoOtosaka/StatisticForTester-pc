<template>
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
          @click="changeNavType(key);toUrl(item.routePath)"
          :index='key.toString()'>
        {{ item.name }}
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeIndex: '1',
      bannerList: [
        {
          name: '仪表盘',
          routePath: '/dashboard'
        },
        {
          name: '数据',
          routePath: '/data'
        },
        {
          name: '图表',
          routePath: '/chart'
        },
        {
          name: '设置',
          routePath: '/setting'
        }
      ]
    }
  },
  methods: {
    toUrl(url){
      this.$router.push(url)
    },
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
