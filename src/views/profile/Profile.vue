<template>
  <div class="profile">
    <profile-login />
  </div>
</template>

<script>
  // 导入子组件
  import ProfileLogin from './childComps/ProfileLogin'

  export default {
    name: 'Profile',
    components: {
      ProfileLogin,
    },
  }
</script>

<style scoped lang="less"></style>
