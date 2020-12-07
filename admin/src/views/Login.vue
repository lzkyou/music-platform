<template>
<!-- 缺少表单验证 -->
  <el-container>
    <el-card header="登录">
      <el-form @submit.native.prevent="login">
        <el-form-item label="账号">
          <el-input v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginData.password" type="password"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const res = await this.$http.post("auth/login", this.loginData);
        localStorage.token = res.data.token;
        const userData = await this.$http.get("auth/user");
        // console.log(userData);
        if (userData.data.permission === "管理员") {
          this.$router.push("/");
        } else {
          this.$message.error("无法登录！该账号未拥有管理员权限！");
          localStorage.token = "";
        }
      }
      catch(error) {
        this.$message.error('用户名或密码错误！')
      }
    },
  },
};
</script>

<style scoped>
.el-container {
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f6fafd;
}
.el-card {
  width: 28rem;
  margin-top: -3rem;
}
</style>