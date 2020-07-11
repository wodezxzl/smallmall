<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  // import TabBarItem from './TabBarItem'

  export default {
    name: 'TabBar',
    components: {},
  }
</script>

<style scoped lang="less">
  #tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-evenly;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);
    background-color: #f6f6f6;
  }
</style>
