<template>
  <div v-if="Object.keys(goods).length !== 0" class="detail-base-info">
    <div class="title">
      {{ goods.title }}
    </div>
    <div class="price">
      <span class="now-price">{{ goods.newPrice }}</span>
      <span class="lod-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="price-discount">{{
        goods.discount
      }}</span>
    </div>
    <div class="other-info">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="services-info">
      <span
        class="services-item-info"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img v-lazy="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        },
      },
    },
  }
</script>

<style scoped lang="less">
  .detail-base-info {
    padding: 0 10px 0;
    border-bottom: 6px solid #e4e4e47a;
    .title {
      margin: 10px 0;
      font-size: 20px;
      font-weight: 400;
      color: #393939;
    }
    .price {
      margin: 10px 0 20px;
      span {
        margin: 3px;
      }
      .now-price {
        font-size: 30px;
        color: var(--color-high-text);
      }
      .lod-price {
        font-size: 14px;
        color: #ccc;
        text-decoration: line-through;
      }
      .price-discount {
        display: inline-block;
        padding: 4px 6px;
        font-size: 14px;
        border-radius: 12px;
        vertical-align: top;
        color: #fff;
        background-color: var(--color-tint);
      }
    }
    .other-info {
      display: flex;
      justify-content: space-between;
      padding-bottom: 8px;
      font-size: 14px;
      border-bottom: 3px solid #e4e4e47a;
      color: #b4b4b4;
    }
    .services-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      font-size: 14px;
      color: #626262;
      span {
        vertical-align: middle;
      }
      img {
        width: 16px;
        vertical-align: middle;
      }
    }
  }
</style>
