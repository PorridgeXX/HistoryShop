<template>
  <div class="flex flex-col items-center gap-6 text-gray-600">
    <img class="w-[150px]" src="/emptyCart.svg" alt="Пусто">
    <h1 class="text-2xl font-bold">Пока пусто</h1>
    <p class="text-base text-gray-500">
      Ознакомьтесь с товарами на главной или найдите нужное в каталоге
    </p>
    <router-link
        class="px-6 py-3 text-white bg-[var(--main-color)]  rounded-lg"
        to="/"
    >
      Перейти в каталог
    </router-link>
  </div>
</template>

<script setup lang="ts">
</script>