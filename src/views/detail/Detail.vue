<template>
  <div id="detail">
    <detail-nav-bar />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
    },
    data() {
      return {
        iid: '',
      }
    },
    created() {
      this.iid = this.$route.params.iid
    },
  }
</script>

<style scoped lang="less"></style>
