<template>
  <div class="tab-control">
    <div v-for="(item, index) in title" :key="item" @click="itemClick(index)">
      <span :class="{ active: currentIndex === index }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      title: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        // **在Vue中实现排他,一般准备currentIndex为0,将子元素的index和currentIndex比较,相等就显示样式
        // **再添加点击事件来实时改变currentIndex的值为所点击元素的index
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        // 将点击事件传递给父组件
        this.$emit('tabControlClick', index)
      },
    },
  }
</script>

<style scoped lang="less">
  .tab-control {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 40px;
    background-color: #fff;
    div {
      flex: 1;
      text-align: center;
      span {
        padding: 0 8px 8px;
      }
    }
  }
  .active {
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
</style>
