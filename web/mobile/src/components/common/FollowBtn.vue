<template>
  <div
    @click="toggle()"
    class="follow-btn w-100 text-center mt-3 py-1"
    :class="status ? 'bg-grey span' : 'bg-l-primary white'"
  >
    {{ status ? "已关注" : "关注" }}
  </div>
</template>

<script>
export default {
  name: "FollowBtn",
  props: {
    object: {
      type: String,
      required: true,
    },
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
            type: "User",
            object: this.object,
            name: "follow",
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
          type: "User",
          object: this.object,
          name: "follow",
        });
        this.status = res.data.status;
        // if (this.status === true) {
        //   this.status=='已关注'
        // } else {
        //   this.status=='关注'
        // }
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