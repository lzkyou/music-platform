<template>
  <div>chat</div>
</template>

<script>
export default {
  sockets:{
    connect(){
      console.log('connected');
      this.$socket.emit('events',message=>console.log(message));
    }
  }
}
</script>

<style>

</style>