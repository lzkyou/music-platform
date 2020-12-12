<template>
  <div class="desc-wrap">
    <van-nav-bar
      :fixed="true"
      :title="getType === 'songsheets' ? '歌单' : '专辑'"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="desc">
      <div
        class="desc-bg"
        :style="{ background: `url(${content.cover}) no-repeat center` }"
      ></div>
      <div class="desc-stuff">
        <img :src="content.cover" />
        <div class="desc-context">
          <div class="desc-title">{{ content.name }}</div>
          <p><span>歌手：</span>陈奕迅<span>&nbsp;&gt;</span></p>
          <p><span>发布时间：2020/12/12</span></p>
          <p><span>简介：暂无</span></p>
        </div>
      </div>
    </div>
    <div class="playlist-wrap">
      <div class="playlist-title">
        <van-icon class-prefix="icon" name="1_music94"></van-icon>
        <span>全部播放</span>
      </div>
      <div class="playlist">
        <div class="playlist-item">
          <div class="p-item-index">1</div>
          <div class="p-item-song">
            <div class="p-i-song-title">1</div>
            <div class="p-i-song-singer">1</div>
          </div>
          <van-icon class-prefix="icon" name="zhibo"></van-icon>
          <van-icon class-prefix="icon" name="shipin"></van-icon>
        </div>
      </div>
    </div>
    <!-- <aplayer class="player" music="{}" /> -->
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
      return this.$route.path.split("/")[1];
    },
  },
  methods: {
    async fetchContent() {
      const res = await this.$http.get(`songlist/${this.id}`);
      const randomList = await this.$http.get(`songs/random`);
      this.content = res.data;
      this.songsheet = randomList.data;
      console.log(this.content);
      console.log(this.songsheet);
    },
  },
  created() {
    if (this.getType === "songsheets") {
      this.fetchContent();
    }
  },
};
</script>

<style>
.player {
  position: fixed !important;
  bottom: 0;
  left: 0;
  right: 0;
}
.desc-wrap {
  height: 100vh;
}
.van-nav-bar {
  background-color: transparent !important;
}
.van-nav-bar__title {
  color: white !important;
}
.van-nav-bar .van-icon {
  color: #c42a2a !important;
}
.desc {
  position: relative;
}
.desc-bg {
  width: 100vw;
  height: 250px;
  filter: blur(45px);
  border-radius: 10%;
}
.desc .desc-stuff {
  position: absolute;
  top: 0;
  display: flex;
  box-sizing: border-box;
  width: 100vw;
  padding: 1rem;
  padding-top: 3.875rem;
}
.desc-stuff img {
  width: 9rem;
  height: 9rem;
  object-fit: cover;
  border-radius: 8px;
}
.desc-context {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 9rem;
  padding-left: 1.5rem;
  font-size: 17px;
  color: #eeeeee;
  overflow: hidden;
}
.desc-context p {
  font-size: 13px;
}
.desc-context span {
  color: #cecece;
  font-size: 13px;
}
.playlist-wrap{
  background-color: #fff;
  padding: .5rem;
}
.playlist-wrap .icon-1_music94{
  font-size: 1.5rem;
}
.playlist-title{
  display: flex;
  align-items: center;
}
</style>
