<template>
  <div class="discover">
    <search-bar></search-bar>
    <van-tabs v-model="active" swipeable animated>
      <van-tab :title="'推荐'">
        <!-- 推荐歌手 -->
        <discover-singer :singer="singer"></discover-singer>
        <!-- 推荐歌曲 -->
        <discover-likely-song :likelySong="likelySong" :singer="singer"></discover-likely-song>
        <!-- 动态列表 -->
        <discover-post></discover-post>
      </van-tab>
      <van-tab :title="'曲目'">
        <!-- 歌手曲目 -->
        <discover-song-list :albums="albums"></discover-song-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import SearchBar from "@/components/common/SearchBar.vue";

import DiscoverSinger from "./Comps/DiscoverSinger"
import DiscoverLikelySong from "./Comps/DiscoverLikelySong"
import DiscoverPost from './Comps/DiscoverPost'
import DiscoverSongList from './Comps/DiscoverSongList'

export default {
  components: {
    SearchBar,
    DiscoverSinger,
    DiscoverLikelySong,
    DiscoverPost,
    DiscoverSongList
  },
  data() {
    return {
      active: 0,
      singer: {},
      likelySong: {},
      albums: [],
    };
  },
  methods: {
    async fetchSinger() {
      const res = await this.$http.get("singers");
      this.singer = res.data.data[0];
    },
    async fetchLikelySong() {
      const res = await this.$http.get("songs/findone");
      this.likelySong = res.data[0];
      // console.log(this.likelySong);
    },
    async fetchAlbums() {
      const res = await this.$http.get("albums", {
        params: {
          query: { populate: "songs" },
        },
      });
      this.albums = res.data.data;
      // console.log(this.albums);
    },
  },
  created() {
    this.fetchSinger();
    this.fetchLikelySong();
    this.fetchAlbums();
  },
};
</script>

<style>
.discover {
  padding-bottom: 150px;
}
.van-index-bar__sidebar {
  display: none !important;
}
</style>