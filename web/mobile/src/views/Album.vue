<template>
  <div>
    <van-nav-bar
      :fixed="true"
      title="专辑"
      left-arrow
      left-text="返回"
      @click-left="$router.go(-1)"
    />
    <div class="flex album-album m-2 pt-2 flex-w jc-around">
      <router-link
        tag="a"
        class="text-center mb-1"
        :to="`albums/desc/${item._id}`"
        v-for="item in albums"
        :key="item.index"
      >
        <img class="w-100 shadow" :src="item.cover" />
        <span class="text-dark">{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      albums: {},
    }
  },
  methods: {
    async fetchAlbums() {
      const res = await this.$http.get("albums");
      this.albums = res.data.data;
      // console.log(this.albums);
    },
  },
  created() {
    this.fetchAlbums();
  },
};
</script>

<style>
.album-album{
  margin-top: 46px !important;
}
.album-album a{
  display: block;
  width: 48%;
}
.album-album a img {
  border-radius: 0.3125rem;
}
</style>