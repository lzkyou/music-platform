<template>
  <div class="home">
    <!-- 主页头部 -->
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
    <div class="recommend">
      <home-title :title="'E·臣 | 精选歌单'"></home-title>
      <div class="song-sheet">
        <router-link
          tag="a"
          :to="`songsheets/desc/${item._id}`"
          v-for="item in songSheets"
          :key="item.index"
        >
          <img :src="item.cover" />
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </div>
    <div class="album">
      <home-title :title="'E·臣 | 精选专辑'"></home-title>
      <div class="album-item">
        <router-link
          tag="a"
          :to="`albums/desc/${item._id}`"
          v-for="item in albums"
          :key="item.index"
        >
          <img :src="item.cover" />
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTitle from "./Comps/HomeTitle.vue";
export default {
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
      songSheets: {},
      albums: {}
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
    async fetchSongSheets() {
      const res = await this.$http.get("songlist");
      this.songSheets = res.data.data;
      // console.log(this.songSheet);
    },
    async fetchAlbums(){
      const res = await this.$http.get("albums");
      this.albums = res.data.data;
      console.log(this.albums);
    }
  },
  created() {
    this.fetchBanner();
    this.fetchSongSheets();
    this.fetchAlbums();
  },
  components: {
    HomeTitle,
  },
};
</script>

<style>
.home{
  padding-bottom: 50px;
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
.song-sheet {
  display: flex;
  margin: 1rem;
  flex-wrap: nowrap !important;
  overflow: hidden;
  overflow-x: auto;
}
.song-sheet::-webkit-scrollbar {
  display: none;
}
.song-sheet a {
  display: block;
  padding-right: 0.4375rem;
}
.song-sheet a img {
  width: 6.875rem;
  height: 6.7rem;
  border-radius: 10px;
  object-fit: cover;
}
.song-sheet a span {
  display: inline-block;
  color: #333;
  width: 100%;
  text-align: left;
  font-size: 0.8125rem;
}
.album-item{
  display: flex;
  margin: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
}
.album-item a{
  display: block;
  width: 48%;
  text-align: center;
}
.album-item a img{
  width: 100%;
  border-radius: 0.3125rem;
  box-shadow: 1px 1px 5px #c5c5c5;
}
.album-item a span {
  color: #333;
  line-height: 1.8rem;
  font-size: 0.9375rem;
}
</style>