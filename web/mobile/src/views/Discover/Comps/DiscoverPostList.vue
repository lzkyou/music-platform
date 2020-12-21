<template>
  <div>
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
      <!-- 用户操作 -->
      <div class="like text-center pb-1 bd-bottom flex ai-center jc-center">
        <div class="opt bd-right">
          <like-btn :object="item._id" :text="'点赞'"></like-btn>
        </div>
        <div class="opt">
          <comment-btn :object="item._id" :text="'评论'"></comment-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LikeBtn from "@/components/common/LikeBtn.vue";
import CommentBtn from "@/components/common/CommentBtn";
export default {
  name: "DiscoverPostList",
  components: {
    LikeBtn,
    CommentBtn,
  },
  props:{
    posts:{
      type: Array 
    }
  }
};
</script>

<style>
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
.like .opt {
  width: 50%;
}
</style>