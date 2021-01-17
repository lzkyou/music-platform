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
    <div class="listen">
      <section-title :title="'E·臣 | 大众爱听'"></section-title>
      <van-swipe class="listen-swipe" :show-indicators="false">
        <van-swipe-item v-for="(list, index) in listens" :key="index">
          <div class="listens-list m-2 flex flex-column">
            <div
              class="listens-list-item flex mb-1"
              v-for="(item, index) in list"
              :key="index"
              @click="play(item)"
            >
              <img class="listen-img shadow" :src="item.belongTo[0].cover" />
              <div class="listen-song flex flex-column jc-around py-1 pl-2 box">
                <div class="listen-name">{{ item.name }}</div>
                <div class="listen-desc grey fs-sm">
                  陈奕迅 - {{ item.belongTo[0].name }}
                </div>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
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
      listens: [],
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
    async getListens() {
      const randomList = await this.$http.get(`songs/random`, {
        params: {
          query: { populate: "belong" },
        },
      });
      let list = [];
      for (let i = 0; i < randomList.data.length - 1; i += 3) {
        list.push(randomList.data.slice(i, i + 3));
      }
      this.listens = list;
      console.log(this.listens);
    },
    play(desc) {
      this.$store.state.src = desc.song;
      this.$store.state.title = desc.name;
      this.$store.state.artist = "陈奕迅";
      this.$store.state.pic = desc.belongTo[0].cover;
    },
  },
  created() {
    this.fetchSongSheets();
    this.fetchAlbums();
    this.getListens();
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
.listen-img {
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 8px;
}
</style>