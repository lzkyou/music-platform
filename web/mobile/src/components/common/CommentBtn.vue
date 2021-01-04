<template>
  <div>
    <div @click="showComment()">
      <van-icon
        class="blue fs-xl"
        class-prefix="icon"
        name="liaotian"
      ></van-icon>
      <span>{{ text }}</span>
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '70%' }"
      get-container=".discover"
    >
      <div class="popup-title py-1 lh-5 bd-bottom bg-white">评论</div>
      <div class="comment-wrap">
        <!-- 评论主体 -->
        <div class="comment-item bd-bottom" v-for="item in commentList" :key="item.index">
          <div class="comment-poster flex ai-center mx-2">
            <img class="topic mr-1" :src="item.user.topic" />
            <p class="flex flex-column">
              <span class="fs-md text-left">{{ item.user.nickname }}</span>
              <span class="fs-sm grey">{{ item.createdAt }}</span>
            </p>
          </div>
          <div class="comment-content">
            <p class="m-0 ml-6 mb-4 pl-4 text-left">{{ item.content }}​​​​​​​​</p>
          </div>
        </div>
      </div>
      <van-field
        class="comment-field bd-top"
        v-model="comment"
        autosize
        maxlength="50"
        center
        show-word-limit
        type="textarea"
        :placeholder="placeholder"
        :disabled="isLogin"
      >
        <template #button>
          <van-button :disabled="isLogin" size="small" type="primary" @click="sendComment()"
            >发送</van-button
          >
        </template>
      </van-field>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "CommentBtn",
  props: {
    object: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  data() {
    return {
      show: false,
      comment: "",
      commentList: [],
      isLogin: false,
      placeholder: '请输入信息'
    };
  },
  methods: {
    async showComment() {
      this.show = true;
      const res = await this.$http.get("comments", {
        params: {
          object: this.object,
          query: { populate: "user" },
        },
      });
      this.commentList = res.data;
      // console.log(res.data);
    },
    async sendComment() {
      const res = await this.$http.post("comments", {
        object: this.object,
        type: "Post",
        content: this.comment,
      });
      this.showComment();
      this.comment = ''
    },
  },
  created() {
    if(!localStorage.token){
      this.isLogin = true
      this.placeholder="请先登录"
    }
  },
};
</script>

<style>
.popup-title {
  position: fixed;
  left: 15px;
  right: 15px;
}
.van-popup{
  padding-bottom: 88px;
}
.comment-field.van-cell {
  position: fixed !important;
  bottom: 0;
}
.comment-wrap {
  margin-top: 55px;
  /* padding-bottom: 190px; */
}
</style>