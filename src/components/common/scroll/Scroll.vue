<template>
  <div ref="defaultWrapper">
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
      pullUpLoad: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 这里取初始化对象一定要用this.$refs(用类名它内部调用的是document.querySelector,只会找到第一个类)
      this.scroll = new BScroll(this.$refs.defaultWrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
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
