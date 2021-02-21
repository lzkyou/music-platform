<template>
  <van-search
    v-model="searchField"
    shape="round"
    :placeholder="placeholder"
    input-align="center"
    maxlength="28"
    @search="search()"
  />
</template>

<script>
export default {
  name: "SearchBar",
  props:{
    types: String,
    placeholder:{
      type: String,
      default: '搜索'
    }
  },
  data() {
    return {
      searchField: null,
    };
  },
  methods: {
    search() {
      if(this.types=='profile'){
        this.$router.push(`/search/users/${this.searchField}`)
      }
      else{
        this.$router.push(`/search/songs/${this.searchField}`)
      }
    },
  },
};
</script>

<style>
</style>