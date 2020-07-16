<template>
  <div class="profile-login">
    <div class="main-entrance">
      <div class="title">淘宝商城</div>
      <div class="login clear-fix">
        <div class="left">
          <div><img src="~assets/img/common/avatar.jpg" alt="" /></div>
          <div>
            <span>登入/注册</span>
            <span>暂无绑定手机号</span>
          </div>
        </div>
        <div class="right">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="number">
      <!--余额-->
      <div class="balance">
        <div><span>0.00</span>元</div>
        <div>我的余额</div>
      </div>
      <!--优惠-->
      <div class="discounts">
        <div><span>0</span>个</div>
        <div>我的优惠</div>
      </div>
      <!--积分-->
      <div class="integral">
        <div><span>0</span>分</div>
        <div>我的积分</div>
      </div>
    </div>
    <div class="options">
      <div>我的消息</div>
      <div>积分商城</div>
      <div>会员卡</div>
    </div>
    <div class="other">
      <div>我的购物车</div>
      <div>下载购物车APP</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileEnter',
  }
</script>

<style scoped lang="less">
  .profile-login {
    .main-entrance {
      display: flex;
      flex-direction: column;
      text-align: center;
      color: #fff;
      background-color: #ff8198;
      .title {
        margin: 10px 0;
      }
      .login {
        .left {
          display: flex;
          margin: 20px 10px;
          div:first-child {
            width: 54px;
            height: 54px;
            overflow: hidden;
            border-radius: 50%;
            img {
              width: 54px;
            }
          }
          div:last-child {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin: 7px 0 10px 10px;
            text-align: left;
          }
        }
        .right {
          margin-right: 10px;
          line-height: 94px;
          img {
            width: 16px;
            transform: rotateZ(-180deg);
          }
        }
      }
    }
    .number {
      display: flex;
      height: 70px;
      .balance,
      .discounts,
      .integral {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        border-right: 1px solid #eeeeee;
        div:first-child span {
          font-size: 20px;
          font-weight: bold;
          color: #ff5f3e;
        }
        div:last-child {
          font-size: 14px;
        }
      }
      .integral {
        border: none;
      }
    }
    .options {
      border-top: 10px solid rgba(187, 187, 187, 0.2);
      border-bottom: 10px solid rgba(187, 187, 187, 0.2);
      div {
        margin-left: 40px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
      }
      div:last-child {
        border: none;
      }
    }
    .other {
      div {
        margin-left: 40px;
        line-height: 42px;
        border-bottom: 1px solid #eee;
      }
      div:last-child {
        border: none;
      }
    }
  }
</style>
