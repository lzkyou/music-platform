<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :title="'搜索结果'"
      left-arrow
      left-text="返回"
      @click-left="$router.go(-1)"
    />
    <div v-if="data.type == 'users'" class="w-100 pt-6">
      <div class="search-user-wrap w-100 flex flex-w jc-between">
        <div
          class="user-item px-2 pt-2"
          v-for="(item, index) in data"
          :key="index"
          @click="show(item)"
        >
          <img :src="item.topic" />
          <p class="m-0 fs-sm text-center">{{ item.nickname }}</p>
        </div>
      </div>
    </div>
    <!-- 歌曲搜索 -->
    <div v-else class="list-wrap bg-white px-2">
      <div class="flex mt-1 pt-6 ai-center lh-6 bd-bottom">
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
          v-for="(item, index) in data"
          :key="index"
          @click="play(item)"
        >
          <div class="p-item-index grey text-center pr-1">{{ index + 1 }}</div>
          <div class="p-item-song flex-column flex-1">
            <div class="p-i-song-title">{{ item.name }}</div>
            <div class="p-i-song-desc fs-xs text-grey">
              陈奕迅 -
              {{ item.belong.name }}
            </div>
          </div>
          <action-btn :object="item._id" :name="'like'" :type="'Song'" />
        </div>
      </div>
    </div>
    <van-popup round v-model="showPopup">
      <div class="p-5 pb-5">
        <div class="text-center">{{ nowUser.nickname }}</div>
        <br />
        <img class="popup-topic" :src="nowUser.topic" />
        <div class="nowuser-desc flex mt-1 jc-around">
          <div>动态数：{{ this.postsCount }}</div>
          <div>粉丝：0</div>
        </div>
        <follow-btn :object="nowUser._id" :key="popupKey"></follow-btn>
      </div>
    </van-popup>
  </div>
</template>

<script>
import FollowBtn from "@/components/common/FollowBtn";
import ActionBtn from "@/components/common/ActionBtn";

export default {
  name: "Search",
  components: {
    FollowBtn,
    ActionBtn
  },
  props: {
    field: String,
  },
  data() {
    return {
      data: [],
      showPopup: false,
      nowUser: [],
      postsCount: 0,
      popupKey: 0,
    };
  },
  methods: {
    async fetchUsers() {
      const res = await this.$http.get("users/", {
        params: {
          query: { where: { nickname: { $regex: `${this.field}` } } },
        },
      });
      this.data = res.data.data;
      this.data.type = "users";
    },
    async fetchSongs() {
      const res = await this.$http.get("songs/", {
        params: {
          query: {
            where: { name: { $regex: `${this.field}` } },
            populate: "belong",
          },
        },
      });
      this.data = res.data.data;
      this.data.type = "songs";
      // console.log(this.data);
    },
    async fetchPosts() {
      const res = await this.$http.get(`posts`, {
        params: {
          query: { where: { poster: `${this.nowUser._id}` } },
        },
      });
      this.postsCount = res.data.total;
    },
    show(item) {
      this.nowUser = item;
      this.fetchPosts();
      // 利用动态key销毁重建组件避免数据不更改
      this.popupKey = Math.random();
      this.showPopup = !this.showPopup;
    },
    play(desc) {
      this.$store.state.src = desc.song;
      this.$store.state.title = desc.name;
      this.$store.state.artist = "陈奕迅";
      if (this.getType === "专辑") {
        this.$store.state.pic = this.content.cover;
      } else {
        this.$store.state.pic = desc.belong.cover;
      }
    },
  },
  created() {
    this.fetchUsers();
    this.fetchSongs();
  },
};
</script>

<style>
.user-item {
  /* margin-top: 46px; */
  width: fit-content;
}
.user-item img {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
}
.popup-topic {
  widows: 180px;
  height: 180px;
  border-radius: 50%;
}
.van-popup {
  padding-bottom: unset;
}
.follow-btn {
  border-radius: 5px;
}
</style>