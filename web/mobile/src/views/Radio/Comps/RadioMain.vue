<template>
  <div class="recommend-radio">
    <section-title class="mt-1" :title="'推荐电台'" />
    <div class="radio-recommend flex flex-w m-2">
        <router-link
          tag="div"
          :to="`desc/${item._id}`"
          v-for="item in radios"
          :key="item.index"
          style="width:33.3%"
          class="recommend-item text-center mb-1"
        >
          <img class="shadow" :src="item.cover" />
          <p class="text-dark text-left fs-sm m-0 px-1">{{ item.name }}</p>
        </router-link>
      </div>
  </div>
</template>

<script>
import SectionTitle from "@/components/content/SectionTitle";
export default {
  name: 'RadioMain',
  components:{
    SectionTitle
  },
  data() {
    return {
      radios: []
    }
  },
  methods: {
    async fetchRadios(){
      const res = await this.$http.get('radios')
      this.radios = res.data.data
    }
  },
  created() {
    this.fetchRadios()
  },
}
</script>

<style>
.recommend-item{
  width: 6.875rem;
}
.recommend-item img{
  width: 6.875rem;
  height: 6.7rem;
  border-radius: 10px;
  object-fit: cover;
}
</style>