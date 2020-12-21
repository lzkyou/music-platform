<template>
  <div>
    <div class="singer-topic vw-100 box p-1">
      <img class="w-100" :src="singer.cover" />
      <div class="singer-content">
        <h3 class="pl-3 white fs-xxxl">{{ singer.name }}</h3>
        <p class="pb-3 px-3 lh-4 span fs-sm">{{ singer.introduction }}</p>
      </div>
    </div>
    <van-divider class="my-0">随心推荐</van-divider>
  </div>
</template>

<script>
export default {
  name: "DiscoverSinger",
  props: {
    singer: {
      type: Object,
    },
  },
};
</script>

<style>
.singer-topic {
  position: relative;
}
.singer-topic img {
  border-radius: 30px;
}
.singer-topic h3 {
  letter-spacing: 2px;
}
.singer-content {
  position: absolute;
  bottom: 0;
}
</style>