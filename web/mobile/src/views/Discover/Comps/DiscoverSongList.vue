<template>
  <van-index-bar class="mt-2" :sticky="false">
    <van-index-anchor
      v-for="album in albums"
      :key="album.index"
      :index="album.name"
    >
      <van-cell
        @click="playlist(album, song)"
        v-for="song in album.songs"
        :key="song.index"
        :title="song.name"
      />
    </van-index-anchor>
  </van-index-bar>
</template>

<script>
export default {
  name: "DiscoverSongList",
  props: {
    albums: {
      type: Array,
    },
  },
  methods: {
    playlist(album, song) {
      this.$store.state.src = song.song;
      this.$store.state.title = song.name;
      this.$store.state.artist = "陈奕迅";
      this.$store.state.pic = album.cover;
    },
  },
};
</script>

<style>
</style>