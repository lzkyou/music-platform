<template>
  <div id="app">
    <router-view></router-view>
    <Player />
  </div>
</template>

<script>
import Player from "./components/common/Player";
export default {
  components: {
    Player,
  },
  data() {
    return {
      // renderKey: 0,
      // isAlive: true,
    };
  },
  created() {
    this.$store.state.user = JSON.parse(localStorage.getItem('loginUser'))
  },
};
</script>

<style>
#app {
  width: 100vw;
  overflow: hidden;
}
.player {
  position: fixed !important;
  bottom: 50px;
  left: 0;
  right: 0;
  opacity: 0.9;
}
</style>
