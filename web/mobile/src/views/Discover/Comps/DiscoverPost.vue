<template>
  <div class="post pt-0 py-1 px-2">
    <!-- 文章发布表单 -->
    <discover-post-form></discover-post-form>
    <!-- 文章列表 -->
    <discover-post-list :posts="posts"></discover-post-list>
  </div>
</template>

<script>
import DiscoverPostForm from "./DiscoverPostForm";
import DiscoverPostList from "./DiscoverPostList";

export default {
  name: "DiscoverPost",
  components: {
    DiscoverPostForm,
    DiscoverPostList,
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
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
        // console.log(this.posts);
      } catch {
        //dayjs诡异报错捕获
      }
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style>

</style>