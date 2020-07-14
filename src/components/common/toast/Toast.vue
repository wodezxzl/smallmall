<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      message: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isShow: false,
      }
    },
  }
</script>

<style scoped lang="less">
  .toast {
    padding: 10px;
    border-radius: 4px;
    color: #fff;
    background-color: #636363;
  }
</style>
