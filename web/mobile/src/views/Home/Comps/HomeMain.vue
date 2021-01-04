<template>
  <div>
    <div class="recommend">
      <section-title :title="'E·臣 | 推荐歌单'"></section-title>
      <div class="song-sheet flex m-2 flex-nw">
        <router-link
          tag="a"
          :to="`songsheets/desc/${item._id}`"
          v-for="item in songSheets"
          :key="item.index"
        >
          <img :src="item.cover" />
          <span class="w-100 text-dark text-left fs-sm">{{ item.name }}</span>
        </router-link>
      </div>
    </div>
    <div class="album">
      <section-title :title="'E·臣 | 精选专辑'"></section-title>
      <div class="album-item flex m-2 flex-w jc-around">
        <router-link
          tag="a"
          class="text-center"
          :to="`albums/desc/${item._id}`"
          v-for="item in albums"
          :key="item.index"
        >
          <img class="w-100 shadow" :src="item.cover" />
          <span class="text-dark">{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/content/SectionTitle";
export default {
  name: "HomeMain",
  components: {
    SectionTitle,
  },
  data() {
    return {
      songSheets: {},
      albums: {},
    };
  },
  methods: {
    async fetchSongSheets() {
      const res = await this.$http.get("songlist");
      this.songSheets = res.data.data;
      // console.log(this.songSheet);
    },
    async fetchAlbums() {
      const res = await this.$http.get("albums");
      this.albums = res.data.data;
      // console.log(this.albums);
    },
  },
  created() {
    this.fetchSongSheets();
    this.fetchAlbums();
  },
};
</script>

<style>
.song-sheet {
  overflow: hidden;
  overflow-x: auto;
}
.song-sheet::-webkit-scrollbar {
  display: none;
}
.song-sheet a {
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
}
.album-item a {
  display: block;
  width: 48%;
}
.album-item a img {
  border-radius: 0.3125rem;
}
.album-item a span {
  line-height: 1.8rem;
  font-size: 0.9375rem;
}
</style>