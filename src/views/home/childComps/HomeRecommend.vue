<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title">
      <a :href="item.link">
        <img v-lazy="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommend',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        },
      },
    },
  }
</script>

<style scoped lang="less">
  .recommend {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    height: 150px;
    border-bottom: 10px solid #ededed;
    background-color: var(--color-background);
    img {
      width: 80px;
    }
  }
</style>
