<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false,
      }
    },
    methods: {
      show(message = '默认文字', duration = 1000) {
        this.message = message
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      },
    },
  }
</script>

<style scoped lang="less">
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    border-radius: 4px;
    color: #fff;
    background-color: #636363;
    z-index: 999;
  }
</style>
