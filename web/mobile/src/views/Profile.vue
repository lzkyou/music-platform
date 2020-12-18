<template>
  <div v-if="isShowLogin">
    <van-nav-bar :fixed="true" :title="`我的`" />
    <div class="user-wrap p-3">
      <div class="user mt-6 mb-2">
        <div class="topline flex ai-center shadow bg-white py-2 px-3 my-3">
          <img :src="this.$store.state.user.topic" />
          <div>
            <p>
              你好，<span class="fs-xxl">{{
                this.$store.state.user.username
              }}</span>
            </p>
            <p>关注 1 | 粉丝 9.9w | 动态 1</p>
          </div>
        </div>
      </div>
      <div class="user">
        <div class="topline flex ai-center shadow bg-white py-2 p-3 my-3">
          <div>
            <p><span>私信</span></p>
            <p>未阅读 0 | 已阅读 99 | 已回复 84</p>
          </div>
          <img
            src="http://localhost:3002/uploads/55caaa3612b842e3d52455cd1525e2cb"
          />
        </div>
      </div>
      <div class="user">
        <div class="topline flex ai-center shadow bg-white py-2 p-3 my-3">
          <img
            src="http://localhost:3002/uploads/199db710db09bbdd65ef167c837d7b1b"
          />
          <div>
            <p><span>收藏</span></p>
            <p>红心歌曲 237 首 | 收听次数 2.51 万</p>
          </div>
        </div>
      </div>
      <div class="user">
        <div class="topline flex ai-center shadow bg-white py-2 p-3 my-3">
          <div>
            <p><span>演唱会</span></p>
            <p>近期场次 0 场 | 远期场次 5 场</p>
          </div>
          <img
            src="http://localhost:3002/uploads/ac2175bfcdc714a30797ac4c8fef6e5f"
          />
        </div>
      </div>
      <button
        class="bg-l-primary w-100 white bd-none lh-6 fs-sm"
        @click="logout"
      >
        退出登录
      </button>
    </div>
  </div>
  <div v-else class="reg-wrap vw-100">
    <van-tabs v-model="active" swipeable animated>
      <van-tab :title="'登录'">
        <div class="reg box flex flex-column w-100 jc-around p-6">
          <h1 class="mt-0 mb-1">登录</h1>
          <h2 class="mt-0 dark">马上更多精彩！</h2>
          <input
            class="my-1 bd-border lh-6 pl-2"
            v-model="login.username"
            type="text"
            placeholder="请输入用户名/邮箱"
          />
          <input
            class="my-1 bd-border lh-6 pl-2"
            v-model="login.password"
            type="password"
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
      <van-tab :title="'注册'">
        <div class="reg box flex flex-column w-100 jc-around p-6">
          <h1 class="mt-0 mb-1">注册</h1>
          <h2 class="mt-0 dark">马上更多精彩！</h2>
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
            type="password"
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
    async loginAccount() {
      try {
        const res = await this.$http.post("auth/login", this.login);
        localStorage.token = res.data.token;
        const user = await this.$http.get("auth/user");
        this.$store.state.user = user.data;
        localStorage.setItem("loginUser", JSON.stringify(user.data));
        this.$notify({
          type: "success",
          message: "登录成功",
        });
        setTimeout(() => {
          location.reload();
        }, 1500);
      } catch {
        this.$notify("用户名或密码错误");
      }
    },
    logout() {
      this.$notify({
        type: "danger",
        message: "正在退出",
      });
      setTimeout(() => {
        localStorage.clear();
        location.reload();
      }, 1500);
    },
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
.user-wrap {
  height: calc(100vh - 155px) !important;
  overflow: hidden;
  overflow-y: auto;
}
.reg input,
.reg button,
.user-wrap button {
  border-radius: 5px;
}
.reg input::placeholder {
  font-size: 13px;
  color: #838383;
}
.user img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 15px;
}
.user .topline {
  border-radius: 5px;
}
.user:nth-child(2n) .topline div {
  flex: 1;
}
.user .topline div p:last-child {
  font-size: 14px;
  color: #858585;
}
.user:nth-child(2n) .topline img {
  margin-left: 15px;
}
</style>
