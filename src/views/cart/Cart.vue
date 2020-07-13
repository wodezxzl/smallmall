<template>
  <h2>购物车</h2>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    computed: {
      // 将getter中的函数转换成计算属性
      ...mapGetters({
        length: 'cartLength',
      }),
    },
    activated() {
      console.log(1)
    },
  }
</script>

<style scoped lang="less"></style>
