<template>
  <div @click="toggle()">
    <van-icon
      class="fs-xl"
      class-prefix="icon"
      :name="iconName"
      :color="status ? '#c42a2a' : '#000'"
    ></van-icon>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "ActionBtn",
  props: {
    object: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    name:{
      type: String,
      required: true,
    },
    iconName:{
      type: String,
      default: '1_music89'
    }
  },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    async getStatus() {
      if (localStorage.token) {
        const res = await this.$http.get("actions/status", {
          params: {
            type: "Post",
            object: this.object,
            name: this.name,
          },
        });
        this.status = res.data.status;
      }
    },
    async toggle() {
      if (!localStorage.token) {
        this.$toast.fail("请先登录！");
      } else {
        const res = await this.$http.post("actions/toggle", {
          type: "Post",
          object: this.object,
          name: this.name,
        });
        this.status = res.data.status;
        if (this.status === true) {
          this.$toast.success(this.name=='like'?"已点赞！":'已收藏！');
        } else {
          this.$toast.fail("已取消！");
        }
      }
    },
  },
  mounted() {
    this.getStatus();
  },
};
</script>

<style>
</style>