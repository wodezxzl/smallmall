<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="icon"></slot></div>
    <div v-else><slot name="active-icon"></slot></div>
    <div :style="activeStyle"><slot name="word"></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      // 可能传入的活动状态颜色,默认值为#ff5777
      activeColor: {
        type: String,
        default: '#ff5777',
      },
    },
    computed: {
      isActive() {
        // **判断当前活跃路径是否为自己的路径,来实时动态决定每一个组件的isActive值**
        return this.$route.path.indexOf(this.path) !== -1
      },
      // 设置活动状态颜色
      activeStyle() {
        // 活跃时设置样式否则为空
        return this.isActive ? { color: this.activeColor } : {}
      },
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      },
    },
  }
</script>

<style scoped lang="less">
  .tab-bar-item {
    height: 49px;
    font-size: 16px;
    text-align: center;
    img {
      margin-top: 5px;
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
  }
</style>
