<template>
  <div class="goods-lists">
    <goods-item
      v-for="(item, index) in goods"
      :key="index"
      :item="item"
    ></goods-item>
  </div>
</template>

<script>
  import GoodsItem from './GoodsItem'

  export default {
    name: 'GoodLists',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        },
      },
    },
    components: {
      GoodsItem,
    },
  }
</script>

<style scoped lang="less">
  .goods-lists {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0 6px;
  }
</style>
