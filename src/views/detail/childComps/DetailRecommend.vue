<template>
  <div class="detail-recommend">
    <goods-lists :goods="recommendList">
      <goods-item />
    </goods-lists>
  </div>
</template>

<script>
  import GoodsLists from '@/components/content/Goods/GoodsLists'
  import GoodsItem from '@/components/content/Goods/GoodsItem'

  export default {
    name: 'DetailRecommend',
    props: {
      recommendList: {
        type: Array,
        default() {
          return []
        },
      },
    },
    components: {
      GoodsLists,
      GoodsItem,
    },
  }
</script>

<style scoped lang="less"></style>
