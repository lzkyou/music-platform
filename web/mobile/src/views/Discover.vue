<template>
  <div class="discover">
    <van-search
      shape="round"
      placeholder="搜索"
      input-align="center"
      maxlength="28"
    />
    <van-tabs v-model="active" swipeable animated>
      <van-tab :title="'推荐'">
        <div class="singer-topic vw-100 box p-1">
          <img class="w-100" :src="singer.cover" />
          <div class="singer-content">
            <h3 class="pl-3 white fs-xxxl">陈奕迅</h3>
            <p class="pb-3 px-3 lh-4 span fs-sm">{{ singer.introduction }}</p>
          </div>
        </div>
        <van-divider class="my-0">随心推荐</van-divider>
        <div
          @click="play(likelySong)"
          class="flex pb-1 px-2 lh-4 ai-center bd-bottom"
        >
          <div class="p-item-index grey text-center">
            <van-icon
              class="primary fs-xxxl pr-2"
              class-prefix="icon"
              name="1_music94"
            ></van-icon>
          </div>
          <div class="p-item-song flex-column flex-1">
            <div class="p-i-song-title">{{ likelySong.name }}</div>
            <div
              v-if="likelySong.belongTo"
              class="p-i-song-desc fs-xs text-grey"
            >
              陈奕迅 - {{ likelySong.belongTo[0].name }}
            </div>
          </div>
          <van-icon class="grey" class-prefix="icon" name="shipin"></van-icon>
        </div>
        <div class="post py-1 px-2">
          <div v-for="item in posts" :key="item.index">
            <div class="singer flex ai-center">
              <img
                class="topic pr-1"
                v-if="item.imgs[0]"
                :src="item.imgs[0].value"
              />
              <p class="flex flex-column">
                <span class="fs-md">{{ item.user }}</span>
                <span class="fs-sm grey">{{ item.createdAt }}</span>
              </p>
            </div>
            <div class="content">
              <p class="m-0">{{ item.content }}​​​​​​​​</p>
              <p class="content-img-wrap flex flex-nw">
                <img
                  class="content-img pr-1"
                  v-for="img in item.imgs"
                  :key="img.index"
                  :src="img.value"
                />
              </p>
            </div>
            <div
              class="like text-center pb-1 bd-bottom flex ai-center jc-center"
            >
              <van-icon
                class="primary fs-sm bd-right"
                class-prefix="icon"
                name="1_music89"
                >点赞</van-icon
              >
              <van-icon class="blue fs-sm" class-prefix="icon" name="liaotian"
                >评论</van-icon
              >
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab :title="'曲目'">
        <van-index-bar class="mt-2" :sticky="false">
          <van-index-anchor
            v-for="album in albums"
            :key="album.index"
            :index="album.name"
          >
            <van-cell
              @click="playlist(album, song)"
              v-for="song in album.songs"
              :key="song.index"
              :title="song.name"
            />
          </van-index-anchor>
        </van-index-bar>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      singer: {},
      likelySong: {},
      posts: {},
      albums: {},
    };
  },
  methods: {
    async fetchSinger() {
      const res = await this.$http.get("singers");
      this.singer = res.data.data[0];
    },
    async fetchOneSong() {
      const res = await this.$http.get("songs/findone");
      this.likelySong = res.data[0];
      // console.log(this.likelySong);
    },
    async fetchPosts() {
      const res = await this.$http.get("posts");
      this.posts = res.data.data;
      // console.log(this.posts);
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
    play(desc) {
      this.$store.state.src = desc.song;
      this.$store.state.title = desc.name;
      this.$store.state.artist = "陈奕迅";
      this.$store.state.pic = desc.belongTo[0].cover;
    },
    playlist(album,song){
      this.$store.state.src = song.song;
      this.$store.state.title = song.name;
      this.$store.state.artist = "陈奕迅";
      this.$store.state.pic = album.cover;
    }
  },
  created() {
    this.fetchSinger();
    this.fetchOneSong();
    this.fetchPosts();
    this.fetchAlbums();
  },
};
</script>

<style>
.discover {
  padding-bottom: 150px;
}
.singer-topic {
  position: relative;
}
.singer-topic img {
  border-radius: 30px;
}
.singer-content {
  position: absolute;
  bottom: 0;
}
.singer-topic h3 {
  letter-spacing: 2px;
}
.topic {
  height: 45px;
  object-fit: cover;
  border-radius: 50%;
}
.content-img {
  height: 130px;
}
.content-img-wrap {
  overflow: hidden;
  overflow-x: auto;
}
.content-img-wrap::-webkit-scrollbar {
  display: none;
}
.like i {
  width: 50%;
}
.van-index-bar__sidebar {
  display: none !important;
}
</style>