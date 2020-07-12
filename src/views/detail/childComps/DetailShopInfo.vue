<template>
  <div class="detail-shop-info">
    <div class="shop-name">
      <span
        class="logo"
        :style="{ backgroundImage: 'url(' + shop.logo + ')' }"
      ></span>
      <span class="name">{{ shop.name }}</span>
    </div>
    <div class="shop-info">
      <div class="shop-info-left">
        <div class="sell">
          <span>{{ sells }}</span>
          <span>总销量</span>
        </div>
        <div class="goodsCount">
          <span>{{ shop.goodsCount }}</span>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="shop-info-right">
        <ul v-for="item in shop.score" :key="item.name">
          <li>{{ item.name }}</li>
          <!-- 默认样式是高评价,如果为false则覆盖高评价样式-->
          <li class="highColor" :class="{ lowColor: item.isBetter }">
            {{ item.score }}
          </li>
          <li class="highBgColor" :class="{ lowBgColor: item.isBetter }">
            {{ item.isBetter ? '高' : '低' }}
          </li>
        </ul>
      </div>
    </div>
    <div class="gotoShop">进店逛逛</div>
  </div>
</template>

<script>
  export default {
    name: 'DetailShopInfo',
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    computed: {
      sells() {
        return (this.shop.sells / 10000).toFixed(1) + '万'
      },
    },
  }
</script>

<style scoped lang="less">
  .detail-shop-info {
    padding: 0 10px;
    color: #2d2d2d;
    border-bottom: 2px solid #e8e8e8;
    .shop-name {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 80px;
      .logo {
        display: inline-block;
        width: 40px;
        height: 40px;
        vertical-align: middle;
        border-radius: 50%;
        background-size: cover;
      }
      .name {
        margin-right: 10px;
        font-size: 18px;
        vertical-align: middle;
      }
    }
    .shop-info {
      display: flex;
      justify-content: center;
      .shop-info-left {
        display: flex;
        justify-content: center;
        margin: 20px 0;
        width: 50%;
        border-right: 2px solid #ccc;
        .sell {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 20px;
        }
        .goodsCount {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        span {
          margin: 4px 0;
        }
      }
      .shop-info-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50%;
        ul {
          display: flex;
          margin: 6px 0;
          li {
            margin: 0 3px;
          }
        }
        li:nth-child(2) {
          width: 32px;
        }
        li:last-child {
          color: #fff;
        }
      }
    }
    .gotoShop {
      margin: 8px auto 24px;
      width: 140px;
      line-height: 30px;
      text-align: center;
      border-radius: 15px;
      background-color: #f5f5f5;
    }
  }
  .highColor {
    color: #31c27c;
  }
  .highBgColor {
    background-color: #31c27c;
  }
  .lowColor {
    color: #bf4e48;
  }
  .lowBgColor {
    background-color: #bf4e48;
  }
</style>
