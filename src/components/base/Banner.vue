<template>
    <el-menu
        :default-active="bannerUrl"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
      <el-menu-item @click="changeNavStatus">
        <el-button size="mini" class="el-icon-arrow-left" v-if="!isCollapse" type="info" circle></el-button>
        <el-button size="mini" class="el-icon-arrow-right" v-else type="info" circle></el-button>
      </el-menu-item>
      <el-menu-item
          v-for="(item, key) in bannerList"
          :key="key"
          @click="changeNavType(key);"
          :index='item.routePath'>
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
      bannerUrl:this.$route.path,
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
        // {
        //   name: '设置',
        //   routePath: '/setting'
        // }
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
    },
    setBannerActive() {
      for (let i = 0;i<this.bannerList.length;i++){
        if (this.$route.fullPath.indexOf(this.bannerList[i]["routePath"]) === 0){
          this.bannerUrl = this.bannerList[i]["routePath"]
          this.activeIndex = i + 1
        }
      }
    }
  },
  mounted() {
    this.setBannerActive()
    console.log(this.activeIndex)
    // this.changeNavType()
  },
  watch: {
    $route(val){
      for (let i = 0;i<this.bannerList.length;i++){
        if (val.fullPath.indexOf(this.bannerList[i]["routePath"]) === 0){
          this.bannerUrl = this.bannerList[i]["routePath"]
          this.activeIndex = i + 1
        }
      }
    }
  }
}
</script>
