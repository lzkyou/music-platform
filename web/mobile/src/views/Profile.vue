<template>
  <div v-if="isShowLogin"></div>
  <div v-else class="reg-wrap vw-100">
    <van-tabs v-model="active" swipeable animated>
      <van-tab :title="'注册'">
        <div class="reg box flex flex-column w-100 jc-around p-6">
          <h2 class="mt-0">马上更多精彩！</h2>
          <input
            class="my-1 bd-border lh-6 pl-2"
            v-model="reg.username"
            type="text"
            placeholder="请输入用户名/邮箱(登录用)"
          />
          <input
            class="my-1 bd-border lh-6 pl-2"
            v-model="reg.nickname"
            type="text"
            placeholder="请输入昵称"
          />
          <input
            class="my-1 bd-border lh-6 pl-2"
            v-model="reg.password"
            type="text"
            placeholder="请输入密码"
          />
          <button
            class="my-1 bg-l-primary white bd-none lh-6 fs-md"
            @click="regAccount"
          >
            注册
          </button>
        </div>
      </van-tab>
      <van-tab :title="'登录'">
        <div class="reg box flex flex-column w-100 jc-around p-6">
          <h2 class="mt-0">马上更多精彩！</h2>
          <input
            class="my-1 bd-border lh-6 pl-2"
            v-model="login.username"
            type="text"
            placeholder="请输入用户名/邮箱"
          />
          <input
            class="my-1 bd-border lh-6 pl-2"
            v-model="login.password"
            type="text"
            placeholder="请输入密码"
          />
          <button
            class="my-1 bg-l-primary white bd-none lh-6 fs-md"
            @click="loginAccount"
          >
            登录
          </button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      isShowLogin: "",
      reg: {},
      login: {},
    };
  },
  methods: {
    isLogin() {
      localStorage.token === undefined
        ? (this.isShowLogin = false)
        : (this.isShowLogin = true);
    },
    async regAccount() {
      const res = await this.$http.post("auth/reg", this.reg);
      if (res.status === 201) {
        this.$toast.success("注册成功！");
        this.active = 1;
      }
    },
    async loginAccount(){
      const res = await this.$http.post('auth/login',this.login)
      localStorage.token = res.data.token
      const user = await this.$http.get('auth/user')
      this.$store.state.user =  user.data
      localStorage.setItem('loginUser',JSON.stringify(user.data))
    }
  },
  created() {
    this.isLogin();
    // console.log(this.isShowLogin);
    // console.log(this.$store.state.user);
  },
};
</script>

<style>
.reg-wrap .van-tab__pane {
  display: flex;
  align-items: center;
  height: calc(100vh - 200px) !important;
}
.reg input,
.reg button {
  border-radius: 5px;
}
.reg input::placeholder {
  font-size: 13px;
  color: #838383;
}
</style>
