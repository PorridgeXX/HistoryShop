<script setup>
import {loadFromLocalStorage} from "@/lib/utils.js";

const isAuth = loadFromLocalStorage('token')
</script>

<template>
<div class = "">
  <ul class = "flex gap-12 items-center justify-center text-white">
    <li class = "userClick flex flex-col items-center"><img class = "w-[23px]" src="/hui.svg" alt=""><span>Избранное</span></li>
    <router-link v-if = "isAuth" to="cart"><li class = "userClick flex flex-col items-center"><img src="/Cart.svg" alt="">Корзина</li></router-link>

  </ul>
</div>
</template>

<style scoped>
  .userClick{
    cursor: pointer;
    align-items: center;
    font-weight: 400;
    text-align: center;
  }
</style>