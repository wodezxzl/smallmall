<template>
  <div class="cart-goods-lists" v-show="cartLength !== 0">
    <div v-for="item in cartLists" :key="item.iid" class="goods-item">
      <cart-goods-item :item="item" />
    </div>
  </div>
</template>

<script>
  import CartGoodsItem from './CartGoodsItem'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CartGoodsLists',
    components: {
      CartGoodsItem,
    },
    computed: {
      ...mapGetters(['cartLists', 'cartLength']),
    },
  }
</script>

<style scoped lang="less">
  .cart-goods-lists {
    width: 100%;
    .goods-item {
      padding: 10px;
    }
  }
</style>
