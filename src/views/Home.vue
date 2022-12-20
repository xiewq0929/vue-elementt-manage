<template>
  <div>
    <el-button type="info" round @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
</style>