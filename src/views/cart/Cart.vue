<template>
  <div id="cart">
    <!--顶部栏-->
    <nav-bar>
      <template v-slot:center>
        <div>购物车({{ length }})</div>
      </template>
    </nav-bar>
    <!--中间商品列表-->
    <scroll class="cart-swiper" ref="cartScroll">
      <cart-goods-lists />
    </scroll>
    <!--底部计算栏-->
    <cart-bottom-bar />
  </div>
</template>

<script>
  // 子组件
  import CartGoodsLists from './childComps/CartGoodsLists'
  import CartBottomBar from './childComps/CartBottomBar'

  // 公共组件
  import NavBar from '@/components/common/navbar/NavBar'

  // 滚动组件
  import Scroll from '@/components/common/scroll/Scroll'

  // getter转为计算属性简写
  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartGoodsLists,
      CartBottomBar,
      Scroll,
    },
    computed: {
      // 将getter中的函数转换成计算属性
      ...mapGetters({
        length: 'cartLength',
      }),
    },
    activated() {
      this.$refs.cartScroll.refresh()
    },
  }
</script>

<style scoped lang="less">
  #cart {
    height: 100vh;
    .cart-swiper {
      position: relative;
      height: calc(100% - 44px - 40px - 49px);
    }
  }
</style>
