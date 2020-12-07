<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          mode="vertical"
          style="height: 100vh"
          :default-active="$route.path"
          router
        >
          <el-submenu
            v-for="(submenus, subIndex) in menu.subItems"
            :index="`menu-item-${subIndex}`"
            :key="`menu-item-${subIndex}`"
          >
            <template slot="title">{{ submenus.title }}</template>
            <el-menu-item
              v-for="(item, itemIndex) in submenus.items"
              :index="item.path"
              :key="`menu-item-${subIndex}-${itemIndex}`"
            >
              {{ item.title }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <h3 class="title">音乐后台管理</h3>
        </el-header>
        <el-main>
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: {
        subItems: [
          {
            title: "内容管理",
            items: [
              { title: "歌手管理", path: "/singers/list" },
              { title: "专辑管理", path: "/albums/list" },
              { title: "歌曲管理", path: "/songs/list" },
            ],
          },
          {
            title: "运营管理",
            items: [{ title: "用户管理", path: "/users/list" }],
          },
        ],
      },
      userModel: {}
    };
  },
  methods: {
    async getUser() {
      const res = await this.$http.get("auth/user");
      this.userModel = res.data.username
      console.log(this.userModel);
    },
  },
  created() {
    this.getUser()
  },
};
</script>

<style scoped>
.header {
  padding: 0 !important;
}
.title {
  background-color: #ecf5ff;
  color: #333;
  line-height: 4rem;
  padding-left: 1rem;
  margin: 0;
}
</style>

