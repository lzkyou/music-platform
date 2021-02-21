<template>
  <div class="user">
    <div class="topline flex ai-center shadow bg-white py-2 p-3 my-3">
      <div>
        <p><span>收藏</span></p>
        <p>
          <span @click="show('posts')">动态 {{ collectPosts }} 条</span>
          <span @click="show('songs')"> | 歌曲 {{ collectSongs }} 首</span>
        </p>
      </div>
      <img
        src="http://localhost:3002/uploads/199db710db09bbdd65ef167c837d7b1b"
      />
    </div>
    <van-popup round v-model="showPopup">
      <div class="p-5 pt-3 pb-5">
        <div class="text-center mb-1">{{ popupList.type }}</div>
        <div class="follow-list">
          <div
            v-for="(item, index) in popupList"
            :key="index"
            class="mb-1 pb-1 bd-bottom"
          >
            <!-- 收藏Popup -->
            <div
              v-if="popupList.type.split('(').shift() == '动态'"
              class="flex ai-center"
            >
              <img
                :src="item.object.poster.topic"
                style="height: 50px; width: 50px"
              />
              <div class="flex-1">
                <p class="mt-1 mb-1 fs-sm grey">
                  {{ item.object.poster.nickname }}
                </p>
                <p class="mt-1 mb-0">{{ item.object.content }}</p>
              </div>
            </div>
            <div v-else class="flex ai-center">
              <img
                :src="item.object.belong.cover"
                style="height: 50px; width: 50px;"
              />
              <div class="flex-1">
                <p class="mt-0 mb-0 fs-sm grey">
                  {{ item.object.belong.name }}
                </p>
                <p class="my-0">{{ item.object.name }}</p>
              </div>
              <action-btn :object="item.object._id" :name="'like'" :type="'Song'"/>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import ActionBtn from "@/components/common/ActionBtn"

export default {
  name: "ProfileCollect",
  components:{
    ActionBtn
  },
  data() {
    return {
      collectPosts: 0,
      collectSongs: 0,
      showPopup: false,
      popupList: [],
    };
  },
  methods: {
    async fetchPostsList() {
      const res = await this.$http.get(`actions`, {
        params: {
          query: {
            where: {
              user: `${this.$store.state.user._id}`,
              type: "Post",
              name: "collect",
            },
            populate: {
              path: "object",
              populate: {
                path: "poster",
              },
            },
          },
        },
      });
      this.collectPosts = res.data.total;
      this.popupList = res.data.data;
      this.popupList.type = `动态(${res.data.total})`;
      console.log(this.popupList);
    },
    // 获取收藏歌曲列表
    async fetchSongsList() {
      const res = await this.$http.get(`actions`, {
        params: {
          query: {
            where: {
              user: `${this.$store.state.user._id}`,
              type: "Song",
              name: "like",
            },
            populate: {
              path: "object",
              populate: {
                path: "belong",
              },
            },
          },
        },
      });
      this.collectSongs = res.data.total;
      this.popupList = res.data.data;
      this.popupList.type = `歌曲(${res.data.total})`;
      console.log(this.popupList);
    },

    show(witch) {
      if (witch == "posts") {
        this.fetchPostsList();
        this.showPopup = !this.showPopup;
      } else {
        this.fetchSongsList();
        this.showPopup = !this.showPopup;
      }
    },
  },
  created() {
    this.fetchPostsList();
    this.fetchSongsList();
  },
};
</script>

<style>
</style>