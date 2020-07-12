<template>
  <nav-bar class="nav-bar">
    <template v-slot:left>
      <div class="detail-left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
    </template>
    <template v-slot:center>
      <div class="detail-center">
        <span
          :class="{ active: currentType === index }"
          v-for="(item, index) in navBarLists"
          :key="item"
          @click="navBarClick(index)"
          >{{ item }}</span
        >
      </div>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'

  export default {
    name: 'DetailNavBar',
    components: {
      NavBar,
    },
    data() {
      return {
        navBarLists: ['商品', '参数', '评论', '推荐'],
        currentType: 0,
      }
    },
    methods: {
      navBarClick(index) {
        this.currentType = index
      },
      backClick() {
        // 点击路由返回
        this.$router.back()
      },
    },
  }
</script>

<style scoped lang="less">
  .nav-bar {
    background-color: #fff;
    .detail-left {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .detail-center {
      display: flex;
      justify-content: space-evenly;
      font-size: 16px;
      .active {
        color: var(--color-high-text);
      }
    }
  }
</style>
