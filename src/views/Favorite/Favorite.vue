<script setup>
/* ==================================================
   Imports
   ================================================== */
import { onMounted } from "vue";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast/use-toast';
import { useFavoriteStore } from '@/stores/favoriteStore.js';
import { useCartStore } from "@/components/Cart/js/cart.js";

/* ==================================================
   State
   ================================================== */
const { toast } = useToast();
const favoriteStore = useFavoriteStore();

/* ==================================================
   Methods
   ================================================== */
const handlerClick = async (id) => {
  const store = useCartStore();
  const res = await store.saveToCart(id);

  if (res) {
    toast({
      title: 'Товар добавлен',
      description: `Был добавлен товар в корзину`,
      duration: 2000,
    });
  } else {
    toast({
      title: 'Нельзя добавить товар, который уже находится в корзине',
      duration: 2000,
    });
  }
};

/* ==================================================
   Lifecycle hooks
   ================================================== */
onMounted(() => {
  favoriteStore.loadFavorites();
});
</script>


<template>
  <div class="container">
    <h1 class="text-5xl mt-6">Ваши избранные:</h1>

    <!-- Проверяем наличие избранных товаров -->
    <div v-if="favoriteStore.favorites.length > 0" class="grid grid-cols-3 gap-4 mt-8">
      <div
          v-for="item in favoriteStore.favorites"
          :key="item.id"
          class="w-[325px] h-auto p-4 rounded-lg bg-white shadow-lg"
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
          <Button class = "bg-[#7f0000]" @click="favoriteStore.removeFavorite(item.id)">
            Удалить из избранного
          </button>
          <Button
              @click="handlerClick(item.id)"
              class="py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
          >
            В корзину
          </Button>
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
