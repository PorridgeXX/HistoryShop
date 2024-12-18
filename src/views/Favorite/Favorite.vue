<script setup>
import { useFavoriteStore } from '@/stores/favoriteStore.js';
import {useCartStore} from "@/components/Cart/js/cart.js";
import { useToast } from '@/components/ui/toast/use-toast'
import {onMounted} from "vue";

const {toast} = useToast();
const favoriteStore = useFavoriteStore();
const handlerClick = async (id) => {
  const store = await useCartStore();
  const res = await store.saveToCart(id);
  if (res) {
    toast({
      title: 'Товар добавлен',
      description: `Был добавлен товар в корзину на сумму ${props.item.price}`,
      duration: 2000,
    });
  } else {
    toast({
      title: 'Нельзя добавить товар, который уже находится в корзине',
      duration: 2000,
    });
  }
};

onMounted(() => {
  favoriteStore.loadFavorites();
})
</script>

<template>
  <div class="container">
    <h1 class="text-5xl mt-6">Ваши избранные:</h1>

    <!-- Проверяем наличие избранных товаров -->
    <div v-if="favoriteStore.favorites.length > 0" class="grid grid-cols-3 gap-4 mt-8">
      <div
          v-for="item in favoriteStore.favorites"
          :key="item.id"
          class="w-full h-auto p-4 rounded-lg bg-white shadow-lg"
      >
        <!-- Изображение товара -->
        <img
            :src="item.picture"
            alt=""
            class="w-full h-48 object-contain rounded-md"
        />

        <!-- Информация о товаре -->
        <div class="mt-4">
          <h2 class="font-bold text-lg truncate">{{ item.name }}</h2>
          <p class="text-gray-500 text-sm truncate">{{ item.description }}</p>
          <p class="font-semibold text-xl mt-2">{{ item.price }} ₽</p>
        </div>

        <!-- Кнопки -->
        <div class="mt-2 flex gap-2">
          <button
              @click="favoriteStore.removeFavorite(item.id)"
              class="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Удалить из избранного
          </button>
          <button
              @click="handlerClick(item.id)"
              class="py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>

    <!-- Сообщение, если избранных товаров нет -->
    <p v-else class="text-gray-500 mt-6">Вы пока ничего не добавили в избранное.</p>
  </div>
</template>


<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
