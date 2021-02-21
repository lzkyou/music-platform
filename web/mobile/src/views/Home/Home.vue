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
    <van-grid :border="false" icon-size="2rem">
      <van-grid-item
        class="nav-item"
        v-for="item in navItem"
        :key="item.index"
        :icon="item.icon"
        icon-prefix="icon"
        :text="item.name"
        :to="item.path"
        v-show="item.show"
        
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
        { icon: "1_music93", name: "新歌", path: '/newsongs/desc/list', show: true },
        // { icon: "1_music80", name: "私人FM", path: `/pfm/desc/${this.$store.state.user._id}`, show: this.$store.state.user },
        { icon: "changpian", name: "专辑", path: '/albums', show: true },
        { icon: "diantai", name: "电台", path: '/radios/', show: true },
        { icon: "caidan", name: "更多", path: '/', show: true },
      ],
      
    };
  },
  methods: {
    async fetchBanner() {
      const res = await this.$http.get(`ads`, {
        params: {
          query: { where: { name: "home" } },
        },
      });
      //获取banner图片
      this.banner = res.data.data[0].items.map((v) => v.value);
      // console.log(this.banner);
    },
    isLogin(){
    if(this.$store.state.user){
        this.navItem.splice(1,0,{ icon: "1_music80", name: "私人FM", path: `/pfm/desc/${this.$store.state.user._id}`, show: this.$store.state.user })
      } 
    }
  },
  created() {
    this.fetchBanner();
    this.isLogin();
  },
};
</script>

<style>
.home{
  padding-bottom: 110px;
}
.home-swipe img {
  height: 28vh;
  width: 100vw;
  object-fit: cover;
}
.nav-item{
  flex: 1 !important;
}
.nav-item i {
  color: #c42a2a;
}
.van-grid-item__content {
  background-color: transparent !important;
}
</style>