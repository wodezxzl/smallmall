<template>
  <div class="cart-bottom-bar">
    <div class="total">
      <select-button
        class="cart-bottom-select-button"
        :isChecked="isChecked"
        @click.native="allSelectClick"
      />
      <div class="all-select">全选</div>
      <div class="total">合计:¥ {{ totalPrice }}</div>
    </div>
    <div class="go-buy">去购买({{ checkedNum }})</div>
  </div>
</template>

<script>
  import SelectButton from '@/components/content/SelectButton'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      SelectButton,
    },
    computed: {
      ...mapGetters(['cartLength', 'cartLists']),

      // 选中商品的总价格
      totalPrice() {
        if (this.cartLength === 0) {
          return 0
        } else {
          return this.cartLists
            .filter(item => item.checked)
            .reduce((pre, cur) => {
              return pre + cur.price * cur.count
            }, 0).toFixed(2)
        }
      },
      // 已选中的商品数目
      checkedNum() {
        return this.cartLength === 0
          ? 0
          : this.cartLists.filter(item => item.checked).length
      },
      // 将全选是否选中传递给选择按钮子组件,在其内部决定样式显示
      isChecked() {
        // 发现只要有一个商品没有选中返回false
        return !this.$store.state.cartLists.find(item => !item.checked)
      },
    },
    methods: {
      // 点击按钮时是否全选或者全不选(根据计算属性isChecked来判断状态)
      allSelectClick() {
        if (this.isChecked) {
          // 当为true时,此次点击造成false,也就是全不选
          this.cartLists.forEach(item => {
            // 这里直接赋布尔值,如果取反后赋值,取反的操作本身会影响中间内容按钮组件的样式
            item.checked = false
          })
        } else {
          this.cartLists.forEach(item => {
            item.checked = true
          })
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .cart-bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    padding-left: 10px;
    width: 100%;
    background-color: rgba(232, 232, 232);
    .total {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      line-height: 40px;
      .all-select {
        margin-left: 12px;
      }
      .total {
        margin-left: 60px;
      }
    }
    .go-buy {
      width: 120px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background-color: var(--color-tint);
    }
  }
</style>
