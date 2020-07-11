<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <template v-slot:center><span>首页</span></template>
    </nav-bar>
    <!-- 该tab-control为scroll里面的复制品.为了实现停留效果
    (不能使用fixed实现,滚动插件内部使用transform会改变fixed的定位参考对象)-->
    <tab-control
      v-show="isTabControlStop"
      class="replace-tab-control"
      :title="['流行', '新款', '精选']"
      @tabControlClick="tabControlClick"
      ref="replaceTabControl"
    />
    <scroll
      class="home-wrapper"
      :probe-type="3"
      @scroll="scroll"
      @getMoreGoods="getMoreGoods"
      ref="cScroll"
    >
      <home-swiper
        class="home-swiper"
        :banners="banners"
        @swiperImgLoad="swiperImgLoad"
      />
      <home-recommend class="home-recommend" :recommends="recommends" />
      <home-feature />
      <tab-control
        class="home-tab-control"
        :title="['流行', '新款', '精选']"
        @tabControlClick="tabControlClick"
        ref="cTabControl"
      />
      <good-lists :goods="goods[currentType].list" />
    </scroll>
    <!--监听组件点击需要加上native-->
    <go-top v-show="isShowGoTop" @click.native="goTop" />
  </div>
</template>

<script>
  // 公共组件
  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/TabControl'
  import GoodLists from '@/components/content/Goods/GoodsLists'
  import Scroll from '@/components/common/scroll/Scroll'
  import GoTop from '@/components/content/GoTop'

  // 子组件
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import HomeFeature from './childComps/HomeFeature'

  // 网络请求
  import { getHomeMultidata, getHomeGoods } from 'network/home'

  // 公共方法
  import { debounce } from '@/common/utils'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodLists,
      Scroll,
      GoTop,
    },
    data() {
      return {
        banners: null,
        recommends: null,
        // 商品数据列表
        goods: {
          pop: { page: 0, list: [] },
          new: { page: 0, list: [] },
          sell: { page: 0, list: [] },
        },
        currentType: 'pop',
        isShowGoTop: false,
        tabControlOffSetTop: 0,
        isTabControlStop: false,
      }
    },
    methods: {
      /**
       * 事件监听相关
       */
      // 1.tabControl点击切换数据
      tabControlClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 实现两个tabControl的同步
        this.$refs.replaceTabControl.currentIndex = index
      },
      // 2.回到顶部
      goTop() {
        this.$refs.cScroll.scrollTo(0, 0, 500)
      },
      // 3.根据scroll组件传递过来的页面滚动距离决定是否显示回到顶部和是否tabControl吸顶
      scroll(position) {
        this.isShowGoTop = -position.y > 1000
        this.isTabControlStop = -position.y > this.tabControlOffSetTop
      },
      // 4.上拉加载更多
      getMoreGoods() {
        // currentType记录着当前在哪一个tab-control
        this.getHomeGoods(this.currentType)
      },
      // 5.轮播图加载完毕拿到tabControl的offsetTop
      swiperImgLoad() {
        this.tabControlOffSetTop = this.$refs.cTabControl.$el.offsetTop
      },

      /**
       * 网络请求相关
       */
      // 1.请求轮播图和推荐数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      // 2.请求商品数据
      getHomeGoods(type) {
        // 每次调用加载下一页数据
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 直接使用数组的展开将数据依次放入对应type的list数组里面
          this.goods[type].list.push(...res.data.list)
          // 加载完该页后应该将对应的page页码增加,以对应当前数据页码
          this.goods[type].page++
          // 每加载完毕一页数据就执行finishPullUp,表示可以执行下一次上拉加载更多
          //TODO 这里是有BUG的如果图片来的太快可能拿不到this.$refs.cScroll
          this.$refs.cScroll.finishPullUp()
        })
      },
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // 在mounted中才能拿到this.$refs.cScroll
      // 使用一个防抖函数
      const refresh = debounce(this.$refs.cScroll.refresh, 500)
      // 请求图片后就监听图片是否加载完毕,每个图片加载完毕就执行refresh
      this.$bus.$on('itemImageLoad', () => {
        refresh()
      })
    },
  }
</script>

<style scoped lang="less">
  #home {
    position: relative;
    height: 100vh;
    .replace-tab-control {
      position: relative;
      z-index: 1;
    }
    .home-wrapper {
      position: absolute;
      /*必须同时设置top和bottom,home-wrapper才有高度*/
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
      overflow: hidden;
    }
  }
</style>
