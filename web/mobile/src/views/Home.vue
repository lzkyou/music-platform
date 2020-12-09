<template>
  <div>
    <van-search
      shape="round"
      placeholder="搜索"
      input-align="center"
      maxlength="28"
    />
    <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-grid :gutter="10">
      <van-grid-item
        square
        v-for="value in 4"
        :key="value"
        icon="photo-o"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: {},
    };
  },
  methods: {
    async fetchBanner() {
      const res = await this.$http.get(`ads`, {
        params: {
          query: { where: { name: "banner" } },
        },
      });
      this.banner = res.data.data[0].items.map((v) => v.value);
      // this.banner = res.data.data[0].items.map(v=>({
      //   url: v.value
      // }));
      console.log(this.banner);
    },
  },
  created() {
    this.fetchBanner();
  },
};
</script>

<style>
.home-swipe img {
  height: 30vh;
  width: 100vw;
  object-fit: cover;
}
</style>