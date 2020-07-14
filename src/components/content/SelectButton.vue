<template>
  <div class="select-button" :class="{ hadSelect: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
  export default {
    name: 'SelectButton',
    props: {
      isChecked: {
        type: Boolean,
        default: true,
      },
    },
  }
</script>

<style scoped lang="less">
  .select-button {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    border: 2px solid #ccc;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .hadSelect {
    background-color: var(--color-high-text);
    border: 1px solid var(--color-high-text);
  }
</style>
