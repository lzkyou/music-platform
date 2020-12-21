<template>
  <div v-if="isShowPost">
    <van-divider class="mt-0 mb-1" @click="$router.push('/profile')">点击登录后即可发布动态</van-divider>
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
</template>

<script>
export default {
  name: "DiscoverPostForm",
  data() {
    return {
      isShowPost: "",
      newPost: {
        content: "",
        imgs: [],
        poster: "",
      },
      fileList: [],
    };
  },
  methods: {
    showPost() {
      localStorage.token === undefined
        ? (this.isShowPost = true)
        : (this.isShowPost = false);
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
          this.$parent.fetchPosts();
        }
      }
    },
  },
  created() {
    this.showPost();
  },
};
</script>

<style>
</style>