<template>
  <div class="detail-comment">
    <div class="comment-bar clear-fix">
      <span class="left">用户评价</span>
      <span class="right">更多</span>
    </div>
    <div class="comments">
      <div v-for="item in comment" :key="item.content">
        <div class="user">
          <img :src="item.user.avatar" alt="" />
          <span>{{ item.user.uname }}</span>
        </div>
        <div class="content">{{ item.content }}</div>
        <div class="other-info">
          <span class="time">{{ item.created }}</span>
          <span class="style">{{ item.style }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailComment',
    props: {
      comment: {
        type: Array,
        default() {
          return []
        },
      },
    },
  }
</script>

<style scoped lang="less">
  .detail-comment {
    padding: 0 10px;
    border-top: 3px solid #ececec;
    .comment-bar {
      border-bottom: 1px solid #eeeeee;
      span {
        color: var(--color-text);
        line-height: 50px;
      }
    }
    .comments {
      .user {
        img {
          margin: 10px;
          width: 50px;
          border-radius: 25px;
          vertical-align: middle;
        }
        span {
          color: #000;
          vertical-align: middle;
        }
      }
      .content {
        margin-bottom: 10px;
        color: #8d8d8d;
      }
      .other-info {
        margin-bottom: 40px;
        color: #ccc;
      }
    }
  }
</style>
