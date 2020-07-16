<template>
  <div id="category">
    <nav-bar>
      <template v-slot:center>商品分类</template>
    </nav-bar>
    <div class="main-content">
      <!--左侧项目列表-->
      <scroll class="category-item-scroll" ref="itemScroll">
        <category-item-list :itemlist="itemlist" @itemClick="itemClick" />
      </scroll>

      <!--右侧详细商品分类列表-->
      <!--hack停留做法(复制一份到时候显示)-->
      <tab-control
        v-show="isTabControlStop"
        class="hide-item"
        ref="hideItem"
        :title="['综合', '新品', '销量']"
        @tabControlClick="tabControlClick"
      />
      <scroll
        class="detail-list-scroll"
        ref="cScroll"
        @scroll="scroll"
        :probeType="3"
      >
        <!--由于better-scroll的原因内容用了margin,margin合并导致content有了margin-top-->
        <!--加载后bs会让content和wrapper位置保持一致, 因此开始整体回向上移动一段距离, 加一个div消除margin合并-->
        <div style="height: 1px;margin-top: -1px"></div>
        <!--上方详细项目分类-->
        <category-detail-list :goodsList="goodsList" @itemLoad="itemLoad" />
        <!--下方推荐商品图片-->
        <tab-control
          class="category-tab-control"
          :title="['综合', '新品', '销量']"
          ref="cTabControl"
          @tabControlClick="tabControlClick"
        />
        <goods-lists class="categoryGoodsList" :goods="goods" />
      </scroll>
    </div>
    <go-top v-show="isShowGoTop" @click.native="goTop" />
  </div>
</template>

<script>
  // 公共组件
  import NavBar from '@/components/common/navbar/NavBar'
  import Scroll from '@/components/common/scroll/Scroll'
  import TabControl from '@/components/content/TabControl'
  import GoodsLists from '@/components/content/Goods/GoodsLists'

  // 子组件
  import CategoryItemList from './childComps/CategoryItemList'
  import CategoryDetailList from './childComps/CategoryDetailList'

  // 网络请求
  import {
    getCategoryInfoList,
    getDetailCategory,
    getRecommendGoods,
  } from '@/network/category'

  // 公共方法
  // 混入: 1.处理图片加载成功刷新滚动高度函数  2:回到顶部
  import { imgListenerMixin, backTopMixin } from '@/common/mixin'

  export default {
    name: 'Category',
    components: {
      NavBar,
      Scroll,
      TabControl,
      GoodsLists,
      CategoryItemList,
      CategoryDetailList,
    },
    data() {
      return {
        itemlist: [],
        detailGoodsCategoryList: {},
        goodsImageList: {},
        currentIndex: 0,
        tabControlIndex: 0,
        tabControlName: ['pop', 'new', 'sell'],
        goods: [],
        tabControlOffSetTop: 0,
        isTabControlStop: false,
        imageLoadListener: null,
      }
    },
    mixins: [imgListenerMixin, backTopMixin],
    computed: {
      goodsList() {
        if (Object.keys(this.detailGoodsCategoryList).length === 0) return []
        return this.detailGoodsCategoryList[this.currentIndex].list
      },
    },
    methods: {
      /**
       * 网络请求
       */
      // 1.请求左侧栏项目类别
      getCategoryInfoList() {
        getCategoryInfoList().then(
          res => {
            this.itemlist = res.data.category.list
            this.itemlist.forEach((item, index) => {
              this.detailGoodsCategoryList[index] = { maitKey: item.maitKey }
              this.goodsImageList[index] = { miniWallkey: item.miniWallkey }
            })
            // 2.第一次请求右侧项目商品详细分类
            this.getDetailCategory(this.currentIndex)
          },
          err => {
            console.log(err)
          },
        )
      },
      // 2.请求右侧相应项目商品详细分类
      getDetailCategory(index) {
        const maitKey = this.detailGoodsCategoryList[index].maitKey
        getDetailCategory(maitKey).then(
          res => {
            this.detailGoodsCategoryList[index].list = res.data.list
            // 1.普通情况下对象属性更新不具有响应式,需要一些方式,这里通过解构赋值更新整个对象
            // 在请求得到详细分类列表时computed能够知道数据变化,并将正确数据给子组件
            this.detailGoodsCategoryList = { ...this.detailGoodsCategoryList }
            // 2.第一次请求右侧推荐商品图片
            this.getRecommendGoods(this.tabControlIndex, this.tabControlName[0])
          },
          err => {
            console.log(err)
          },
        )
      },
      // 3.请求右侧相应项目商品图片信息
      getRecommendGoods(index, type) {
        const miniWallkey = this.goodsImageList[index].miniWallkey
        getRecommendGoods(miniWallkey, type).then(
          res => {
            this.goods = res
          },
          err => {
            console.log(err)
          },
        )
      },

      /**
       * 事件处理
       */
      // 1.根据子组件传递过来的index请求右侧详细分类数据
      itemClick(index) {
        this.currentIndex = index
        this.getDetailCategory(this.currentIndex)
      },
      // 2.推荐商品控制栏点击切换时请求数据
      tabControlClick(index) {
        this.tabControlIndex = index
        this.getRecommendGoods(
          this.currentIndex,
          this.tabControlName[this.tabControlIndex],
        )

        // **保证两个tabControl显示一致
        this.$refs.hideItem.currentIndex = index
        this.$refs.cTabControl.currenIndex = index
      },
      // 3.当详细分类图片加载完毕刷新可滚动高度,同时得到tabControl的offsetTop
      itemLoad() {
        this.$refs.cScroll.refresh()
        this.tabControlOffSetTop = this.$refs.cTabControl.$el.offsetTop
        console.log(this.tabControlOffSetTop)
      },
      // 4.判断是否显示回到顶部按钮和tabControl是否吸顶
      scroll(position) {
        this.isShowGoTop = -position.y > 1000
        this.isTabControlStop = -position.y > this.tabControlOffSetTop
      },
    },
    created() {
      // 1.请求左侧分类项目数据
      this.getCategoryInfoList()
    },
    updated() {
      this.$refs.itemScroll.refresh()
    },
  }
</script>

<style scoped lang="less">
  #category {
    height: 100vh;
    .main-content {
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      top: 44px;
      bottom: 49px;
      overflow: hidden;
      .category-item-scroll {
        flex-basis: 24%;
        flex-shrink: 0;
        height: 100%;
        background-color: #f6f6f6;
      }
      .hide-item {
        position: absolute;
        top: 0;
        right: 0;
        width: 76%;
        z-index: 999;
      }
      .detail-list-scroll {
        width: 76%;
        height: 100%;
        .category-tab-control {
          width: 100%;
        }
        .categoryGoodsList {
          width: 100%;
        }
      }
    }
  }
</style>
