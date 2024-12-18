<script setup>
import logo from "@/views/adminPanel/usage/ui/logo.vue"
import NavList from "@/views/adminPanel/usage/header/ui/navList.vue";
</script>

<template>
<header class="header h-[50px] border-b border-white">
  <div class="container flex items-center gap-20">
  <router-link to="/catalog"><logo/></router-link>
    <NavList />
  </div>
</header>
</template>

<style scoped>

</style>