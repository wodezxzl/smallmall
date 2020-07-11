<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  BScroll.use(Pullup)

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll('.wrapper', {
        probeType: this.probeType,
        pullUpLoad: true,
        click: true,
      })
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('getMoreGoods')
        })
      }
    },
    methods: {
      // 先判断this.scroll是否存在,以免在home父组件中调用方法时scroll还没创建
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll && this.scroll.y
      },
    },
  }
</script>

<style scoped lang="less"></style>
