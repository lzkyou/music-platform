<template>
  <div class="discover">
    <search-bar></search-bar>
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
        <div @click="play(likelySong)" class="flex pb-1 px-2 lh-4 ai-center">
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
        <!-- 文章 -->
        <div class="post pt-0 py-1 px-2">
          <div v-if="isShowPost">
            <van-divider class="mt-0 mb-1">登录后即可发布动态</van-divider>
          </div>
          <div v-else>
            <van-divider class="mt-0 mb-1">发布动态</van-divider>
            <!-- 发布文章 -->
            <van-field
              v-model="newPost.content"
              autosize
              maxlength="140"
              center
              show-word-limit
              type="textarea"
              placeholder="输入一些内容吧"
            >
              <template #button>
                <van-button size="small" type="primary" @click="sendPost()"
                  >发送</van-button
                >
              </template>
            </van-field>
            <!-- 图片 -->
            <van-field name="uploader">
              <template #input>
                <van-uploader
                  v-model="fileList"
                  :after-read="imgUpload"
                  :max-count="2"
                  :max-size="2000 * 1024"
                />
              </template>
            </van-field>
          </div>
          <!-- 文章列表 -->
          <div v-for="item in posts" :key="item.index">
            <div class="singer flex ai-center">
              <img class="topic mr-1" :src="item.poster.topic" />
              <p class="flex flex-column">
                <span class="fs-md">{{ item.poster.nickname }}</span>
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
                  :src="img.value || img"
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
import SearchBar from "@/components/common/SearchBar.vue";
export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      active: 0,
      singer: {},
      likelySong: {},
      posts: {},
      albums: {},
      fileList: [],
      newPost: {
        content: "",
        imgs: [],
        poster: "",
      },
      isShowPost: "",
    };
  },
  methods: {
    showPost() {
      localStorage.token === undefined
        ? (this.isShowPost = true)
        : (this.isShowPost = false);
    },
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
      const res = await this.$http.get("posts", {
        params: {
          query: { populate: "poster", sort: "-createdAt" },
        },
      });
      try {
        for (let item of res.data.data) {
          item.createdAt = this.dayjs(
            item.createdAt
              .split("T")
              .map((item) => {
                return item.split(".").shift();
              })
              .join(" ")
          )
            .add(8, "hour")
            .format("YYYY-MM-DD HH:mm:ss");
        }
        this.posts = res.data.data;
        // console.log(format);
      } catch {
        //dayjs诡异报错捕获
      }
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
    async imgUpload(file) {
      let params = new FormData();
      params.append("file", file.file);
      // console.log(file);
      const res = await this.$upload.post("upload", params);
      this.newPost.imgs.push(res.data.url);
      // console.log(this.newPost);
    },
    async sendPost() {
      if (this.newPost.content === "") {
        this.$toast({
          message: "请输入内容！",
          positon: "bottom",
        });
      } else {
        this.newPost.poster = this.$store.state.user._id;
        const res = await this.$http.post("posts", this.newPost);
        if (res.status === 201) {
          this.$toast.success("发送成功！");
          this.newPost.content = "";
          this.newPost.imgs = [];
          this.newPost.poster = "";
          this.fileList = [];
          this.fetchPosts();
        }
      }
    },
    play(desc) {
      this.$store.state.src = desc.song;
      this.$store.state.title = desc.name;
      this.$store.state.artist = "陈奕迅";
      this.$store.state.pic = desc.belongTo[0].cover;
    },
    playlist(album, song) {
      this.$store.state.src = song.song;
      this.$store.state.title = song.name;
      this.$store.state.artist = "陈奕迅";
      this.$store.state.pic = album.cover;
    },
  },
  created() {
    this.showPost();
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