<template>
  <div class="home">
    <!-- 主页头部 -->
    <search-bar></search-bar>
    <!-- 轮播 -->
    <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in banner" :key="index">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 导航 -->
    <van-grid :border="false" icon-size="2rem" :column-num="5">
      <van-grid-item
        class="nav-item"
        v-for="item in navItem"
        :key="item.index"
        :icon="item.icon"
        icon-prefix="icon"
        :text="item.desc"
      />
    </van-grid>
    <!-- 主页主体 -->
    <home-main></home-main>
  </div>
</template>

<script>
import SearchBar from "@/components/common/SearchBar.vue";
import HomeMain from "./Comps/HomeMain"

export default {
  components: {
    SearchBar,
    HomeMain,
  },
  data() {
    return {
      banner: {},
      navItem: [
        { icon: "1_music93", desc: "新歌" },
        { icon: "1_music80", desc: "私人FM" },
        { icon: "changpian", desc: "专辑" },
        { icon: "diantai", desc: "电台" },
        { icon: "caidan", desc: "分类" },
      ],
      
    };
  },
  methods: {
    async fetchBanner() {
      const res = await this.$http.get(`ads`, {
        params: {
          query: { where: { name: "banner" } },
        },
      });
      //获取banner图片
      this.banner = res.data.data[0].items.map((v) => v.value);
      // console.log(this.banner);
    },
  },
  created() {
    this.fetchBanner();
  },
  
};
</script>

<style>
.home{
  padding-bottom: 110px;
}
.home-swipe img {
  height: 30vh;
  width: 100vw;
  object-fit: cover;
}
.nav-item i {
  color: #c42a2a;
}
.van-grid-item__content {
  background-color: transparent !important;
}
</style>