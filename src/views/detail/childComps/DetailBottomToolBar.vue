<template>
  <div class="detail-bottom-tool-bar">
    <div class="option">
      <div class="service">
        <div class="icon-img"></div>
        <div>客服</div>
      </div>
      <div class="store">
        <div class="icon-img"></div>
        <div>店铺</div>
      </div>
      <div class="collect">
        <div class="icon-img"></div>
        <div>收藏</div>
      </div>
    </div>
    <div class="addCart" @click="addCartClick">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomToolBar',
    methods: {
      addCartClick() {
        this.$emit('addCartClick')
      },
    },
  }
</script>

<style scoped lang="less">
  .detail-bottom-tool-bar {
    display: flex;
    position: relative;
    left: 0;
    right: 0;
    width: 100vw;
    height: 49px;
    text-align: center;
    background-color: #fff;
    z-index: 9;
    .option {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 50%;
      .icon-img {
        width: 32px;
        height: 32px;
      }
      .service {
        .icon-img {
          background: url('~assets/img/detail/detail_bottom.png') 3px -58px no-repeat;
          background-size: 80%;
        }
      }
      .store {
        .icon-img {
          background: url('~assets/img/detail/detail_bottom.png') 3px -110px no-repeat;
          background-size: 80%;
        }
      }
      .collect {
        .icon-img {
          background: url('~assets/img/detail/detail_bottom.png') 3px 5px
            no-repeat;
          background-size: 80%;
        }
      }
    }
    .addCart {
      width: 25%;
      line-height: 49px;
      background-color: #ffde10;
    }
    .buy {
      width: 25%;
      line-height: 49px;
      background-color: #ff779b;
    }
  }
</style>
