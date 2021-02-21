<template>
  <div>
    <div class="user" @click="show()">
      <div class="topline flex ai-center shadow bg-white py-2 p-3 my-3">
        <img
          src="http://localhost:3002/uploads/ac2175bfcdc714a30797ac4c8fef6e5f"
        />
        <div>
          <p><span>动态</span></p>
          <p>已发布 {{ postsCount }} 条动态</p>
        </div>
      </div>
    </div>
    <van-popup
      v-model="showPostsPopup"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="popup-title py-1 lh-5 bd-bottom bg-white">
        {{ popupList.type }}
      </div>
      <div class="comment-wrap">
        <div
          class="comment-item bd-bottom"
          v-for="(item, index) in postsList"
          :key="index"
        >
          <div class="comment-poster flex ai-center mx-2">
            <img class="topic mr-1" :src="item.poster.topic" />
            <p class="flex flex-1 flex-column">
              <span class="fs-md text-left">{{ item.poster.nickname }}</span>
              <span class="fs-sm grey">{{ item.createdAt }}</span>
            </p>
            <div
              @click="delPost(item._id)"
              class="post-delete-btn ml-3 mt-1 mb-3 py-1 px-2 fs-xs bg-l-primary white"
            >
              删除
            </div>
          </div>
          <div class="comment-content">
            <p class="mt-0 ml-6 mb-3 pl-4 text-left">
              {{ item.content }}​​​​​​​​
            </p>
            <p class="content-img-wrap flex flex-nw ml-3 pl-6">
              <img
                class="content-img pr-1"
                v-for="img in item.imgs"
                :key="img.index"
                :src="img.value || img"
              />
            </p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "ProfilePostsDesc",
  data() {
    return {
      postsCount: 0,
      showPostsPopup: false,
      popupList: [],
      postsList: [],
    };
  },
  methods: {
    async fetchPosts() {
      const res = await this.$http.get(`posts`, {
        params: {
          query: {
            where: { poster: `${this.$store.state.user._id}` },
            populate: "poster",
          },
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
        // console.log(this.posts);
      } catch {
        // dayjs诡异报错捕获
      }
      this.postsList = res.data.data;
      this.postsCount = res.data.total;
      this.popupList.type = `动态(${res.data.total})`;
      // console.log(this.postsList);
      // console.log(this.popupList);
    },
    show() {
      this.fetchPosts();
      this.showPostsPopup = !this.showPostsPopup;
    },
    async delPost(id) {
      await this.$http.delete(`posts/${id}`);
      const res = await this.$http.get(`actions`, {
        params: {
          query: {
            where: { object: `${arguments[0]}`, name: 'collect' } },
        },
      });
      await this.$http.post("actions/remove",{
        object: `${id}`
      })
      this.$toast.success("删除成功");
      this.fetchPosts();
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style>
.post-delete-btn {
  width: fit-content;
  border-radius: 7px;
}
</style>