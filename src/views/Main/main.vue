<script setup>
import { Button } from '@/components/ui/button';
</script>

<template>
  <div class="min-h-screen bg-black text-white flex items-center justify-center px-4">
    <!-- Основной блок приветствия -->
    <div class="max-w-5xl w-full bg-[#1C1C1C] shadow-lg p-8 rounded-lg text-center">
      <h1 class="text-6xl font-bold mb-4">Добро пожаловать в магазин <br/>ВремяИстории</h1>
      <p class="text-lg font-light mb-6 leading-relaxed">
        Магазин посвященный антиквариату Российской истории. Найдите всё самое лучшее, в самом лучшем состоянии только у нас!
      </p>
      <div>
        <router-link to="/catalog">       <Button
            class="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          Вход
        </Button></router-link>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Общие стили для страницы */
h1,
p,
h2 {
  color: white;
}

.bg-[#1C1C1C] {
  background-color: #1C1C1C;
}

input {
  transition: border 0.2s ease;
}
</style>
