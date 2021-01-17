<template>
  <van-search
    v-model="searchField"
    shape="round"
    placeholder="搜索"
    input-align="center"
    maxlength="28"
    @search="search"
  />
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchField: null,
    };
  },
  methods: {
    search() {
      console.log(this.searchField);
    },
  },
};
</script>

<style>
</style>