<template>
  <div>
    <section-title class="mt-1" :title="'推荐电台'"></section-title>
    
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

</style>