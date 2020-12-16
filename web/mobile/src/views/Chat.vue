<template>
  <div>
    <van-nav-bar
      :fixed="true"
      :title="`聊天室`"
      :right-text="$store.state.usersNow"
    />
    <van-field
      ref="field"
      class="field"
      v-model="sendMsg"
      autosize
      maxlength="50"
      center
      show-word-limit
      type="textarea"
      placeholder="输入信息"
    >
      <template #button>
        <van-button size="small" type="primary" @click="send()">发送</van-button>
      </template>
    </van-field>
    <div class="room mt-6 p-2">
      <div class="chat" v-for="item in msgs" :key="item.index">
        <div class="time text-center grey fs-sm">{{item.time}}</div>
        <div class="msg-left" v-if="item.sender != 'me'">
          <div class="message bg-white px-2 py-1 m-2">{{ item.msg }}</div>
        </div>
        <div
          class="msg-right flex flex-column ai-end"
          v-if="item.sender == 'me'"
        >
          <div class="message bg-yellow px-2 py-1 m-1">{{ item.msg }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendMsg: "",
      msgs: [],
      usersNow: "",
    };
  },
  sockets: {
    msgToClient(msg) {
      this.msgs.push(msg);
    },
    users(users) {
      this.$store.state.usersNow = users;
    },
  },
  methods: {
    send() {
      if (this.sendMsg === "") {
        this.$toast({
          message: "请输入内容！",
          positon: "bottom",
        });
      } else {
        let time = this.dayjs().format('HH:mm:ss')
        this.$socket.emit("msgToServer", {msg: this.sendMsg, time: time});
        // console.log(this.msgs);
        this.msgs.push({ sender: "me", msg: this.sendMsg, time: time });
        this.sendMsg = "";
      }
    },
  },
  beforeDestroy(){
    this.$store.state.historyChat = this.msgs
  },
  mounted() {
    this.msgs = this.$store.state.historyChat
  },
};
</script>

<style>
.room {
  height: calc(100vh - 280px);
  overflow: hidden;
  overflow-y: auto;
}
.field.van-cell {
  position: fixed !important;
  bottom: 125px;
}
.message {
  width: fit-content;
  border-radius: 20px;
}
.send {
  float: right;
}
</style>