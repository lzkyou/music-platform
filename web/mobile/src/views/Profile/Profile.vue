<template>
  <div v-if="isShowLogin">
    <search-bar :types="'profile'" :placeholder="'输入用户昵称'" />
    <div class="user-wrap px-3">
      <profile-personal />
      <profile-collect />
      <profile-posts-desc />
      <button
        class="bg-l-primary w-100 white bd-none lh-6 fs-sm"
        @click="logout"
      >
        退出登录
      </button>
    </div>
  </div>
  <profile-login-reg v-else />
</template>

<script>
import SearchBar from "@/components/common/SearchBar";

import ProfileLoginReg from "../Profile/Comps/ProfileLoginReg";
import ProfilePersonal from "../Profile/Comps/ProfilePersonal";
import ProfileCollect from "../Profile/Comps/ProfileCollect";
import ProfilePostsDesc from "../Profile/Comps/ProfilePostsDesc";

export default {
  components: {
    SearchBar,
    ProfileLoginReg,
    ProfilePersonal,
    ProfileCollect,
    ProfilePostsDesc
  },
  data() {
    return {
      isShowLogin: "",
      // postsCount: 0,
      // collectPosts: 0,
      // followsCount: 0,
      // followersCount: 0,
      // showPopup: false,
      // showPostsPopup: false,
      // popupList: [],
      // postsList: [],
    };
  },
  methods: {
    isLogin() {
      localStorage.token === undefined
        ? (this.isShowLogin = false)
        : (this.isShowLogin = true);
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
    
      // this.fetchPosts();
      // 利用动态key销毁重建组件避免数据不更改
      // this.popupKey = Math.random();
      // this.showPopup=!this.showPopup;
    // },
  },
  created() {
    this.isLogin();
    // this.fetchFollows();
    // this.fetchFollowers();
    // this.fetchPosts();
    // this.fetchCollectPosts();
    // console.log(this.isShowLogin);
    // console.log(this.$store.state.user);
  },
};
</script>

<style>
.user-wrap {
  height: calc(100vh - 155px) !important;
  overflow: hidden;
  overflow-y: auto;
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
.follow-list {
  width: 30vh;
  height: 30vh;
  overflow: hidden;
  overflow-y: auto;
}
</style>
