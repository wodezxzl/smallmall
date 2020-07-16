<template>
  <div
    v-if="Object.keys(detailImageInfo).length !== 0"
    class="detail-image-info"
  >
    <div class="imageInfo">
      <div class="descInfo clear-fix">
        <div class="image-info-top"></div>
        <div class="desc">{{ detailImageInfo.desc }}</div>
        <div class="image-info-bottom"></div>
      </div>
      <div>{{ detailImageInfo.detailImage[0].key }}</div>
    </div>
    <div class="imageLists">
      <div
        v-for="(item, index) in detailImageInfo.detailImage[0].list"
        :key="index"
      >
        <img v-lazy="item" alt="" @load="imgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailImageInfo',
    props: {
      detailImageInfo: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        currentCount: 0,
        imageLength: 0,
      }
    },
    methods: {
      imgLoad() {
        // 只有当图片完全加载完毕才向父元素发送刷新计算滚动高度请求
        if (++this.currentCount === this.imageLength) {
          this.$emit('detailImageLoad')
        }
      },
    },
    watch: {
      detailImageInfo() {
        // 监听detailImageInfo属性,当值被传递进来后将图片个数给imageLength变量
        this.imageLength = this.detailImageInfo.detailImage[0].list.length
      },
    },
  }
</script>

<style scoped lang="less">
  .detail-image-info {
    .imageInfo {
      padding: 10px;
      .descInfo {
        overflow: hidden;
        .image-info-top,
        .image-info-bottom {
          width: 8px;
          height: 8px;
          background-color: #000;
        }
        .image-info-top::after,
        .image-info-bottom::before {
          content: '';
          display: inline-block;
          position: absolute;
          width: 140px;
          height: 1.6px;
          background-color: #bbb;
        }
        .image-info-top::after {
          left: 8px;
          top: 6px;
        }
        .image-info-bottom::before {
          left: -140px;
          top: 6px;
        }
        .image-info-top {
          position: relative;
          float: left;
        }
        .desc {
          margin: 20px 0 16px;
        }
        .image-info-bottom {
          position: relative;
          float: right;
        }
      }
      div:last-child {
        font-size: 20px;
      }
    }
    .imageLists {
      width: 100vw;
      img {
        width: 100%;
      }
    }
  }
</style>
