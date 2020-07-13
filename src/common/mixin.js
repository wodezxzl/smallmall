import { debounce } from './utils'
import GoTop from '@/components/content/GoTop'

// 多个页面需要用到图片加载刷新滚动高度防抖,使用一个混入函数可以在多个页面中使用
export const imgListenerMixin = {
  mounted() {
    // 在mounted中才能拿到this.$refs.cScroll
    // 使用一个防抖函数
    const refresh = debounce(this.$refs.cScroll.refresh, 500)
    // 请求图片后就监听图片是否加载完毕,每个图片加载完毕就执行refresh
    // 给监听事件处理函数命名,方便取消该处理函数
    this.imageLoadListener = () => refresh()
    this.$bus.$on('itemImageLoad', this.imageLoadListener)
  },
}

// 多个页面的回到顶部
export const backTopMixin = {
  components: {
    GoTop,
  },
  data() {
    return {
      isShowGoTop: false,
    }
  },
  methods: {
    // 2.回到顶部
    goTop() {
      this.$refs.cScroll.scrollTo(0, 0, 500)
    },
  },
}
