<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="detail-param-info">
    <div class="size">
      <table>
        <tr v-for="item in paramInfo.sizes[0]" :key="item[0]">
          <td v-for="(v, i) in item" :key="i">{{ v }}</td>
        </tr>
      </table>
    </div>
    <div class="other-info">
      <table>
        <tr v-for="item in paramInfo.infos" :key="item.key">
          <td>{{ item.key }}</td>
          <td class="value">{{ item.value }}</td>
        </tr>
      </table>
    </div>
    <img v-if="paramInfo.img" v-lazy="paramInfo.img" alt="" />
  </div>
</template>

<script>
  export default {
    name: 'DetailParamInfo',
    props: {
      paramInfo: {
        type: Object,
        default() {
          return {}
        },
      },
    },
  }
</script>

<style scoped lang="less">
  .detail-param-info {
    padding: 30px 10px 0;
    border-top: 4px solid #ececec;
    box-sizing: border-box;
    color: var(--color-text);
    background-color: #fff;
    .size {
      table {
        width: 100%;
        border-collapse: collapse;
        tr {
          td {
            width: 30px;
            padding: 20px 0;
            border-bottom: 1px solid #eeeeee;
          }
        }
        tr:last-child {
          border-bottom: 2px solid #ccc;
        }
      }
    }
    .other-info {
      .value {
        color: var(--color-high-text);
      }
      table {
        width: 100%;
        border-collapse: collapse;
        tr {
          td {
            width: 30px;
            padding: 20px 0;
            border-bottom: 1px solid #eeeeee;
          }
        }
      }
    }
  }
</style>
