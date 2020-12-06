<template>
  <div>
    <h2>{{ options.title }}</h2>
    <avue-crud
      v-if="options.column"
      :option="options"
      :data="data.data"
      :page.sync="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @search-change="search"
      @on-load="changePage"
      @sort-change="changeSort"
    >
    </avue-crud>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
    },
  },
  data() {
    return {
      data: {},
      options: {},
      query: { sort: { _id: -1 } },
      page: {
        total: 0,
      },
    };
  },
  methods: {
    //获取数据以及表单属性
    async fetch() {
      const res = await this.$http.get(`${this.resource}`, {
        params: { query: this.query },
      });
      this.page.total = res.data.total;
      this.data = res.data;
    },
    async fetchOptions() {
      const res = await this.$http.get(`${this.resource}/options`);
      this.options = res.data;
    },
    //添加数据
    async create(row, done) {
      await this.$http.post(`${this.resource}`, row);
      this.$message.success("添加成功！");
      this.fetch();
      done();
    },
    //删除数据
    async remove(row) {
      try {
        await this.$confirm("是否确认删除？");
      } catch (e) {
        this.$message.info("删除已取消！");
        return;
      }
      await this.$http.delete(`${this.resource}/${row._id}`);
      this.$message.error("删除成功！");
      this.fetch();
    },
    //更新数据
    async update(row, index, done) {
      //avue会在数据中添加$index字段确保唯一性，但会导致数据入库失败，所以格式化数据
      const res = JSON.parse(JSON.stringify(row));
      delete res.$index;
      delete res.$belong;
      await this.$http.put(`${this.resource}/${row._id}`, res);
      this.$message.success("修改成功！");
      this.fetch();
      done();
    },
    //模糊查询
    async search(params, done) {
      console.log(params);
      for (let key in params) {
        const field = this.options.column.map((col) => col.prop === key);
        if (field.reg) {
          params[key] = { $regex: params[key] };
        }
      }
      this.query.where = params;
      // console.log(this.query);
      done();
      this.fetch();
    },
    //分页
    async changePage({ pageSize, currentPage }) {
      this.query.page = currentPage;
      this.query.limit = pageSize;
      this.fetch();
    },
    //排序
    async changeSort({ prop, order }) {
      if (!order) {
        this.query.sort = null;
      } else {
        this.query.sort = {
          [prop]: order === "asscending" ? 1 : -1,
        };
        // console.log(this.query);
      }
    },
  },
  created() {
    this.fetchOptions();
    this.fetch();
  },
};
</script>

<style>
</style>