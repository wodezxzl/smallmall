<template>
  <div v-show="itemlist.length !== 0" class="category-item-lists">
    <div
      v-for="(item, index) in itemlist"
      :key="item.title"
      :class="{ active: currentIndex === index }"
      @click="itemClick(index)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CategoryItemList',
    props: {
      itemlist: {
        type: Array,
        default() {
          return []
        },
      },
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        // 1.切换当前currentIndex来改变样式
        this.currentIndex = index
        // 2.将index信息发送给父组件请求具体商品项目分类数据
        this.$emit('itemClick', index)
      },
    },
  }
</script>

<style scoped lang="less">
  .category-item-lists {
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      height: 50px;
    }
    .category-item-scroll {
      flex-basis: 24%;
      flex-shrink: 0;
      height: 100%;
      background-color: #f6f6f6;
    }
  }

  .active {
    font-weight: bold;
    border-left: 4px solid #ff3c3c;
    color: var(--color-high-text);
    background-color: #fff;
  }
</style>
