<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar " />
    <scroll class="detail-scroll" ref="detailScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-image-info
        :detailImageInfo="detailImageInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment :comment="comment" />
      <detail-recommend :recommendList="recommendList" />
    </scroll>
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
    },
    data() {
      return {
        topImages: [],
        goods: {},
        shop: {},
        detailImageInfo: {},
        paramInfo: {},
        comment: [],
        recommendList: [],
      }
    },
    methods: {
      // 图片加载完毕刷新滚动高度
      detailImageLoad() {
        this.$refs.detailScroll.refresh()
      },

      // 发送网络请求
      getDetail() {
        getDetail(this.$route.params.iid).then((res, error) => {
          if (error) return
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
        })
      },
      getRecommend() {
        getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.data.list
        })
      },
    },
    created() {
      this.getDetail()
      this.getRecommend()
    },
  }
</script>

<style scoped lang="less">
  #detail {
    height: 100vh;
    .detail-nav-bar {
      position: relative;
      z-index: 9;
    }
    .detail-scroll {
      position: relative;
      height: calc(100% - 44px);
      background-color: #fff;
      z-index: 8;
    }
  }
</style>
