<template>
  <div class="user mt-4 mb-2">
    <div class="topline flex ai-center shadow bg-white py-2 px-3 my-3">
      <img :src="this.$store.state.user.topic" />
      <div>
        <p>
          <span>你好，</span>
          <span class="fs-xxl">{{ this.$store.state.user.username }}</span>
        </p>
        <p>
          <span @click="show('follow')">关注 {{ followsCount }} | </span>
          <span @click="show('followers')">粉丝 {{ followersCount }} | </span>
          <span>动态 {{ postsCount }}</span>
        </p>
      </div>
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
            <div
              v-if="popupList.type.split('(').shift() == '关注'"
              class="flex ai-center"
            >
              <img :src="item.object.topic" style="height: 50px; width: 50px" />
              <div class="flex-1">{{ item.object.nickname }}</div>
            </div>
            <div
              v-else-if="popupList.type.split('(').shift() == '粉丝'"
              class="flex ai-center"
            >
              <img :src="item.user.topic" style="height: 50px; width: 50px" />
              <div class="flex-1">{{ item.user.nickname }}</div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "ProfilePersonal",
  data() {
    return {
      postsCount: 0,
      collectPosts: 0,
      followsCount: 0,
      followersCount: 0,
      showPopup: false,
      popupList: [],
    };
  },
  methods: {
    // 获取关注数
    async fetchFollows() {
      const res = await this.$http.get(`actions`, {
        params: {
          query: {
            where: { user: `${this.$store.state.user._id}`, name: "follow" },
          },
        },
      });
      this.followsCount = res.data.total;
    },
    // 获取粉丝数
    async fetchFollowers() {
      const res = await this.$http.get(`actions`, {
        params: {
          query: {
            where: { object: `${this.$store.state.user._id}`, name: "follow" },
          },
        },
      });
      this.followersCount = res.data.total;
    }, // 获取动态数
    async fetchPosts() {
      const res = await this.$http.get(`posts`, {
        params: {
          query: {
            where: { poster: `${this.$store.state.user._id}` },
            populate: "poster",
          },
        },
      });
      this.postsCount = res.data.total;
    },
    // 获取关注及粉丝列表
    async fetchFollowsList() {
      const res = await this.$http.get(`actions`, {
        params: {
          query: {
            where: {
              user: `${this.$store.state.user._id}`,
              // object: `${this.$store.state.user._id}`,
              name: "follow",
            },
            populate: "object",
          },
        },
      });
      this.popupList = res.data.data;
      this.popupList.type = `关注(${res.data.total})`;
      // console.log(this.popupList);
      // console.log(this.popupList.type.split('(').shift());
    },
    async fetchFollowersList() {
      const res = await this.$http.get(`actions`, {
        params: {
          query: {
            where: {
              // user: `${this.$store.state.user._id}`,
              object: `${this.$store.state.user._id}`,
              name: "follow",
            },
            populate: "user",
          },
        },
      });
      this.popupList = res.data.data;
      this.popupList.type = `粉丝(${res.data.total})`;
      // console.log(this.popupList);
    },
    show(which) {
      switch (which) {
        case "follow":
          this.fetchFollowsList();
          this.showPopup = !this.showPopup;
          break;
        case "followers":
          this.fetchFollowersList();
          this.showPopup = !this.showPopup;
          break;
      }
    },
  },
  created() {
    this.fetchFollows();
    this.fetchFollowers();
    this.fetchPosts();
  },
};
</script>

<style>
</style>