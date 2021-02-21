<template>
  <div class="reg-wrap vw-100">
    <van-tabs v-model="active" swipeable animated>
      <!-- 登录 -->
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
            autocomplete
          />
          <button
            class="my-1 bg-l-primary white bd-none lh-6 fs-md"
            @click="loginAccount"
          >
            登录
          </button>
        </div>
      </van-tab>
      <!-- 注册 -->
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
  name: "ProfileLoginReg",
  data() {
    return {
      active: 0,
      reg: {},
      login: {
        username: "eason",
        password: "eason",
      },
    };
  },
  methods: {
    // 注册
    async regAccount() {
      if (
        this.reg.username.length < 4 ||
        this.reg.nickname.length < 4 ||
        this.reg.password.length < 8
      ) {
        this.$notify({message:"用户名、昵称不少于4位，密码不少于8位",duration:5000});
      } else {
        try {
          const res = await this.$http.post("auth/reg", this.reg);
          if (res.status === 201) {
            this.$toast.success("注册成功！");
            this.active = 1;
          }
        } catch {
          this.$notify("用户名或邮箱已注册");
        }
      }
    },
    // 登录
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
.reg button,
.user-wrap button {
  border-radius: 5px;
}
.reg input::placeholder {
  font-size: 13px;
  color: #838383;
}
</style>