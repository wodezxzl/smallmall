<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="url" alt="" @load="imgLoad" />
    <span class="description">{{ item.title }}}</span>
    <div>
      <span>{{ price }}</span>
      <span></span>
      <span>{{ item.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsItem',
    props: {
      item: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    computed: {
      url() {
        return this.item.image || this.item.img || this.item.show.img
      },
      price() {
        return this.item.orgPrice || this.item.price
      },
    },
    methods: {
      imgLoad() {
        // 事件总线,发射事件后如何组件都能监听到
        this.$bus.$emit('itemImageLoad')
      },
      // 每一个商品点击后跳转到详情页根据传递过去的id决定显示什么页面
      itemClick() {
        this.$router.push('/detail/' + (this.item.iid || this.item.shop_id))
      },
    },
  }
</script>

<style scoped lang="less">
  .goods-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48%;
    img {
      width: 100%;
      border-radius: 6px;
    }
    .description {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    div {
      display: flex;
      justify-content: center;
      span {
        margin: 0 5px;
      }
      span:first-child {
        display: inline-block;
        color: var(--color-tint);
      }
      span:nth-child(2) {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('~assets/img/common/collect.svg') 0 0 no-repeat;
        background-size: cover;
      }
    }
  }
</style>
