<template>
  <div @click="play(likelySong)" class="flex pb-1 px-2 lh-4 ai-center">
    <div class="p-item-index grey text-center">
      <van-icon
        class="primary fs-xxxl pr-2"
        class-prefix="icon"
        name="1_music94"
      ></van-icon>
    </div>
    <div class="p-item-song flex-column flex-1">
      <div class="p-i-song-title">{{ likelySong.name }}</div>
      <div v-if="likelySong.belongTo" class="p-i-song-desc fs-xs text-grey">
        {{ singer.name }} - {{ likelySong.belongTo[0].name }}
      </div>
    </div>
    <van-icon class="grey" class-prefix="icon" name="shipin"></van-icon>
  </div>
</template>

<script>
export default {
  name: "DiscoverLikelySong",
  props: {
    likelySong: {
      type: Object,
    },
    singer: {
      type: Object,
    },
  },
  methods: {
    play(desc) {
      console.log(desc);
      this.$store.state.src = desc.song;
      this.$store.state.title = desc.name;
      this.$store.state.artist = "陈奕迅";
      this.$store.state.pic = desc.belongTo[0].cover;
    },
  },
};
</script>

<style>
</style>