<template>
  <aplayer
    :volume="0.1"
    class="player"
    :music="{
      title: this.$store.state.title,
      artist: this.$store.state.artist,
      src: this.$store.state.src,
      pic: this.$store.state.pic,
    }"
  />
</template>

<script>
export default {
  name: 'Player'
};
</script>

<style>
</style>