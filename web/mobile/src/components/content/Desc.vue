<template>
  <div class="vh-100">
    <van-nav-bar
      :fixed="true"
      :title="getType"
      left-arrow
      left-text="返回"
      @click-left="$router.go(-1)"
    />
    <div class="desc vw-100">
      <div
        class="desc-bg"
        :style="{ background: `url(${content.cover}) no-repeat center` }"
      ></div>
      <div
        v-if="getType !== '新歌' && getType !== '私人FM'"
        class="desc-stuff vw-100 flex box px-2"
      >
        <img :src="content.cover" />
        <div class="desc-context pl-3 flex flex-column jc-between context">
          <div class="desc-title">{{ content.name }}</div>
          <p><span>歌手：</span>陈奕迅<span>&nbsp;&gt;</span></p>
          <p class="m-0"><span>发布时间：2020/12/12</span></p>
          <p><span>简介：暂无</span></p>
        </div>
      </div>
      <div
        v-else
        class="desc-stuff vw-100 h-100 flex flex-column"
        :class="getType == '新歌' ? 'lg-newsong' : 'lg-pfm'"
      >
        <h1 class="w-100 m-0 text-center white day">
          {{ this.dayjs().format("MM 月") }}
        </h1>
        <h1 class="w-100 mt-1 text-center white day">
          {{ this.dayjs().format("DD 日") }}
        </h1>
        <h2 class="w-100 mt-0 text-center white desc-title">
          {{ `每日 ${getType} 速递` }}
        </h2>
      </div>
    </div>
    <div class="list-wrap bg-white px-2">
      <div class="flex ai-center lh-6 bd-bottom">
        <van-icon
          class="fs-xxxl primary"
          class-prefix="icon"
          name="1_music94"
        ></van-icon>
        <span>全部播放</span>
      </div>
      <div class="playlist">
        <div
          class="flex my-1 lh-4 ai-center"
          v-for="(item, index) in songsheet"
          :key="index"
          @click="play(item)"
        >
          <div class="p-item-index grey text-center">{{ index + 1 }}</div>
          <div class="p-item-song flex-column flex-1">
            <div class="p-i-song-title">{{ item.name }}</div>
            <div class="p-i-song-desc fs-xs text-grey">
              陈奕迅 -
              {{ getType == "专辑" ? content.name : item.belongTo[0].name }}
            </div>
          </div>
          <van-icon class="grey" class-prefix="icon" name="shipin"></van-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
  },
  data() {
    return {
      content: {},
      songsheet: {},
    };
  },
  computed: {
    getType() {
      switch (this.$route.path.split("/")[1]) {
        case "songsheets":
          return "歌单";
          break;
        case "albums":
          return "专辑";
          break;
        case "newsongs":
          return "新歌";
          break;
        case "pfm":
          return "私人FM";
          break;
        case "radios":
          return "电台";
          break;
      }
    },
  },
  methods: {
    //随机获取歌曲
    async getRandomSongs() {
      const randomList = await this.$http.get(`songs/random`, {
        params: {
          query: { populate: "belong" },
        },
      });
      this.songsheet = randomList.data;
      // console.log(this.songsheet);
    },
    //获取歌单详情
    async fetchSongSheet() {
      const res = await this.$http.get(`songlist/${this.id}`);
      this.getRandomSongs();
      this.content = res.data;
      // console.log(this.content);
      // console.log(this.songsheet);
    },
    //获取专辑详情
    async fetchAlbum() {
      const res = await this.$http.get(`albums/${this.id}`, {
        params: {
          query: { populate: "songs" },
        },
      });
      this.content = res.data;
      this.songsheet = res.data.songs;
      // console.log(this.songsheet);
    },
    //获取电台详情
    async getRadio(){
      const res = await this.$http.get(`radios/${this.id}`)
      this.content = res.data
      this.getRandomSongs();
    },
    //播放
    play(desc) {
      this.$store.state.src = desc.song;
      this.$store.state.title = desc.name;
      this.$store.state.artist = "陈奕迅";
      if (this.getType === "专辑") {
        this.$store.state.pic = this.content.cover;
      } else {
        this.$store.state.pic = desc.belongTo[0].cover;
      }
    },
  },
  created() {
    switch (this.getType) {
      case "歌单":
        this.fetchSongSheet();
        break;
      case "专辑":
        this.fetchAlbum();
        break;
      case "新歌":
        this.getRandomSongs();
        break;
      case "私人FM":
        this.getRandomSongs();
        break;
        case "电台":
        this.getRadio();
        break;
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/style.scss";
.van-nav-bar__title {
  color: black !important;
}
.van-nav-bar__text,
.van-nav-bar .van-icon {
  color: #c42a2a !important;
}
.desc {
  position: relative;
  overflow: hidden;
}
.desc-bg {
  height: 250px;
  filter: blur(45px);
  transform: scale(1.3);
  border-radius: 10%;
}
.desc .desc-stuff {
  position: absolute;
  top: 0;
  padding-top: 3.875rem;
}
.desc-stuff img {
  width: 9rem;
  height: 9rem;
  object-fit: cover;
  border-radius: 8px;
}
.desc-context {
  height: 9rem;
  font-size: 17px;
  overflow: hidden;
}
.desc-context p,
.desc-context span {
  font-size: 13px;
}
.desc-context span {
  color: map-get($colors, "span");
}
.list-wrap {
  position: relative;
  margin-top: -1rem;
  border-radius: 15px 15px 0 0;
}
.p-item-index {
  width: 2.5rem;
  margin-left: -0.5rem;
}
.day {
  text-shadow: 4px 3px 0px #5f5f5f;
}
.desc-title {
  text-shadow: 3px 3px 0px #5f5f5f;
}
</style>
