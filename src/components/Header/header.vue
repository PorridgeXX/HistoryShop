<script setup>
 import Logo from "@/components/ui/logo/logo.vue"
 import Search from "@/components/ui/search/search.vue"
 import HeaderList from "@/components/Header/usage/headerList/headerList.vue"

</script>

<template>
  <header class = "bg-[--main-color] h-[122px]">
    <div class="container flex items-center justify-between">
      <Logo/>
      <HeaderList/>
    </div>
  </header>

</template>

<style scoped>

</style>