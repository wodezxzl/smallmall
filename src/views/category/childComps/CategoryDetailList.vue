<template>
  <div v-show="goodsList.length !== 0" class="detail-list">
    <div v-for="item in goodsList" :key="item.maitKey" class="item">
      <div class="image">
        <img :src="item.image" alt="" @load="itemLoad" />
      </div>
      <div class="title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CategoryDetailList',
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        count: 0,
      }
    },
    methods: {
      itemLoad() {
        if (++this.count === this.goodsList.length) {
          this.$emit('itemLoad')
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .detail-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 98px;
      margin: 0 6px 10px 0;
      .image {
        width: 70px;
        img {
          width: 100%;
        }
      }
      .title {
        margin-top: 12px;
        font-size: 12px;
      }
    }
  }
</style>
