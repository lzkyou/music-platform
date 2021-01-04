<template>
  <div>
    <van-nav-bar
      :title="`主播电台`"
      left-arrow
      left-text="返回"
      @click-left="$router.go(-1)"
      :right-text="$store.state.usersNow"
    />
    <van-swipe class="radio-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 主体 -->
    <radio-main></radio-main>
  </div>
</template>

<script>
import SearchBar from "@/components/common/SearchBar";
import RadioMain from './Comps/RadioMain'
export default {
  components: {
    SearchBar,
    RadioMain
  },
  data() {
    return {
      banner: {},
    };
  },
  methods: {
    async fetchBanner() {
      const res = await this.$http.get("ads", {
        params: {
          query: { where: { name: "radio" } },
        },
      });
      this.banner = res.data.data[0].items.map((v) => v.value);
    },
  },
  created() {
    this.fetchBanner();
  },
};
</script>

<style>
.radio-swipe img {
  height: 20vh;
  width: 100vw;
  object-fit: cover;
}
</style>