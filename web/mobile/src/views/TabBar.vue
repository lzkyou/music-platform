<template>
  <div>
    <router-view :key="$route.path"></router-view>
    <van-tabbar v-model="active" active-color="#c42a2a" router>
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/discover" icon="bullhorn-o">发现</van-tabbar-item>
      <van-tabbar-item to="/chat" icon="friends-o">聊天</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  methods: {},
};
</script>

<style>
</style>