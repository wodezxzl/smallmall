<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      ref="detailNavBar"
      @titleClick="titleClick"
    />
    <scroll
      class="detail-scroll"
      ref="cScroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-image-info
        :detailImageInfo="detailImageInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment :comment="comment" ref="comment" />
      <detail-recommend :recommendList="recommendList" ref="recommend" />
    </scroll>
    <detail-bottom-tool-bar @addCartClick="addCartClick" />
    <go-top v-show="isShowGoTop" @click.native="goTop" />
    <toast class="detail-toast" message="添加购物车成功" ref="toast" />
  </div>
</template>

<script>
  // 子组件
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailImageInfo from './childComps/DetailImageInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailComment from './childComps/DetailComment'
  import DetailRecommend from './childComps/DetailRecommend'
  import DetailBottomToolBar from './childComps/DetailBottomToolBar'

  // 公共组件
  import Toast from '@/components/common/toast/Toast'

  // 滚动插件
  import Scroll from '@/components/common/scroll/Scroll'

  // 网络请求
  import {
    getDetail,
    getRecommend,
    Goods,
    Shop,
    GoodsParam,
  } from '@/network/detail'

  // 混入: 1.处理图片加载成功刷新滚动高度函数  2.回到顶部
  import { imgListenerMixin, backTopMixin } from '@/common/mixin'

  // 导入actions映射
  import { mapActions } from 'vuex'

  export default {
    name: 'Detail',
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImageInfo,
      DetailParamInfo,
      DetailComment,
      DetailRecommend,
      DetailBottomToolBar,
      Toast,
    },
    mixins: [imgListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailImageInfo: {},
        paramInfo: {},
        comment: [],
        recommendList: [],
        imageLoadListener: null,
        // navBar中点击每一个选项对应应该滚动到的高度
        themeTopY: [],
      }
    },
    methods: {
      // actions映射
      ...mapActions(['addCart']),

      // 1.发送网络请求
      getDetail() {
        this.iid = this.$route.params.iid
        getDetail(this.iid).then(
          res => {
            const data = res.result
            // 1.获取轮播图信息
            this.topImages = data.itemInfo.topImages
            // 2.获取商品信息
            this.goods = new Goods(
              data.itemInfo,
              data.columns,
              data.shopInfo.services,
            )
            // 3.获取商家信息
            this.shop = new Shop(data.shopInfo)
            // 4.图片展示和描述信息
            this.detailImageInfo = data.detailInfo
            // 5.获取产品尺寸等信息
            this.paramInfo = new GoodsParam(
              data.itemParams.info,
              data.itemParams.rule,
            )
            // 6.获取用户评价
            this.comment = data.rate.list
          },
          error => {
            console.log(error)
          },
        )
      },
      getRecommend() {
        getRecommend().then(
          (res, error) => {
            if (error) return
            this.recommendList = res.data.list
          },
          error => {
            console.log(error)
          },
        )
      },

      // 2.图片加载完毕刷新滚动高度
      detailImageLoad() {
        // 组件内部进行了防抖,只会发射一次detailImageLoad事件,所以不需要对refresh再次防抖
        this.$refs.cScroll.refresh()
        /* *此时获得的高度可能还有问题,因为recommend图片不一定加载完成
         *最好改变混入函数中的imageLoadListener,在其中加上getThemeTopY,以获得绝对准确的数值*/
        this.getThemeTopY()
      },

      // 3.navBar点击滚动页面到对应位置
      titleClick(index) {
        this.$refs.cScroll.scrollTo(0, this.themeTopY[index], 100)
      },

      // 4.获取navBar中每个选项对应的高度
      getThemeTopY() {
        this.themeTopY.push(
          0,
          -this.$refs.param.$el.offsetTop,
          -this.$refs.comment.$el.offsetTop,
          -this.$refs.recommend.$el.offsetTop,
        )
      },

      // 5.监听页面滚定,判断navBar该显示哪一个选项被选中,同时判断是否显示回到顶部按钮
      contentScroll(position) {
        position = position.y
        switch (true) {
          // 注意此时position为负值
          case position >= this.themeTopY[1]:
            this.$refs.detailNavBar.currentType = 0
            break
          case position < this.themeTopY[1] && position >= this.themeTopY[2]:
            this.$refs.detailNavBar.currentType = 1
            break
          case position < this.themeTopY[2] && position >= this.themeTopY[3]:
            this.$refs.detailNavBar.currentType = 2
            break
          case position < this.themeTopY[3]:
            this.$refs.detailNavBar.currentType = 3
            break
        }
        // 是否显示回到顶部
        this.isShowGoTop = -position > 1000
      },

      // 6.加入购物车事件
      addCartClick() {
        // 1.获取商品需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desv = this.goods.desc
        product.price = this.goods.nowPrice
        product.iid = this.iid
        product.checked = true
        // 2.将商品添加到购物车
        this.addCart(product).then(
          // 在返回的promise里面操作
          () => {
            // 先显示成功信息,一秒后消失
            this.$refs.toast.isShow = true
            setTimeout(() => {
              this.$refs.toast.isShow = false
            }, 500)
          },
          err => {
            console.log(err)
          },
        )
      },
    },
    created() {
      // 创建时发送网络请求
      this.getDetail()
      this.getRecommend()
    },
  }
</script>

<style scoped lang="less">
  #detail {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    .detail-nav-bar {
      position: relative;
      z-index: 9;
    }
    .detail-scroll {
      position: relative;
      height: calc(100% - 93px);
      background-color: #fff;
      z-index: 8;
    }
    .goTop {
      z-index: 100;
    }
    .detail-toast {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
    }
  }
</style>
