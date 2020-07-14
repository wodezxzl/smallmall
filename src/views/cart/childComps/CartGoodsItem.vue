<template>
  <div class="cart-goods-item">
    <!--自己的点击直接取反就行,再将布尔值传递给按钮组件显示样式-->
    <div class="goods-select">
      <select-button
        class="select"
        :isChecked="item.checked"
        @click.native="item.checked = !item.checked"
      />
    </div>
    <div class="cart-goods-image"><img :src="item.image" alt="" /></div>
    <div class="describe-info">
      <div>
        <span class="title">{{ item.title }}</span>
        <span class="desc">{{ item.desv }}</span>
        <span class="price">
          <span class="nowPrice">¥{{ item.price }}</span>
          <span class="num">×{{ item.count }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectButton from '@/components/content/SelectButton'
  export default {
    name: 'CartGoodsItem',
    components: {
      SelectButton,
    },
    props: {
      item: {
        type: Object,
        default() {
          return {}
        },
      },
    },
  }
</script>

<style scoped lang="less">
  .cart-goods-item {
    display: flex;
    width: 100%;
    height: 140px;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    .goods-select {
      display: flex;
      align-items: center;
      margin: 0 2px;
    }
    .cart-goods-image {
      display: flex;
      align-items: center;
      img {
        width: 84px;
        border-radius: 8px;
      }
    }
    .describe-info {
      display: flex;
      align-items: center;
      margin-left: 10px;
      color: var(--color-text);
      overflow: hidden;
      div {
        width: 100%;
        .title,
        .desc {
          display: inline-block;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .desc {
          margin: 10px 0 30px;
          font-size: 14px;
          color: #8e8e8e;
        }
        .price {
          display: flex;
          justify-content: space-between;
          font-size: 22px;
          .nowPrice {
            color: var(--color-high-text);
          }
          .num {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
