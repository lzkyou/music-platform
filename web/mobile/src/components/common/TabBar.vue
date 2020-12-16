<template>
  <div>
    <router-view :key="$route.path"></router-view>
    <van-tabbar active-color="#c42a2a" route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/discover" icon="bullhorn-o">发现</van-tabbar-item>
      <van-tabbar-item replace to="/chat" icon="friends-o">聊天</van-tabbar-item>
      <van-tabbar-item replace to="/profile" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<style>
</style>