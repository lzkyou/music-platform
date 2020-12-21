<template>
  <div>
    <van-row type="flex" justify="space-between">
      <van-col class="title" span="12" offset="1">{{title}}</van-col>
      <van-col class="more" span="3">更多&gt;</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'HomeSectionTitle',
  props:{
    title:{
      type: String
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 13px;
}
.more {
  font-size: 13px;
  color: #919191;
}
</style>