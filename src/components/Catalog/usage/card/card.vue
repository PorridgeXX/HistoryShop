<script setup>
/* ==================================================
   Imports
   ================================================== */
// Vue Composition API
import { ref } from "vue";

// UI Imports
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast/use-toast';

// Store Imports
import { useCartStore } from "@/components/Cart/js/cart.js";
import { useFavoriteStore } from "@/stores/favoriteStore.js";

/* ==================================================
   Variables
   ================================================== */
const store = useCartStore();
const { toast } = useToast();
const favoriteStore = useFavoriteStore();

/* ==================================================
   Props
   ================================================== */
const props = defineProps({
  item: {
    type: Object,
  },
});

/* ==================================================
   Methods
   ================================================== */
const handlerClick = async (id) => {
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

const toggleFavorite = () => {
  if (favoriteStore.isFavorite(props.item.id)) {
    favoriteStore.removeFavorite(props.item.id);
    toast({
      title: 'Товар был удален из избранного',
      duration: 5000,
    });
  } else {
    favoriteStore.addFavorite(props.item);
    toast({
      title: 'Товар добавлен в избранное',
      duration: 5000,
    });
  }
};
</script>

<template>
  <div>
    <div class="w-[286px] h-[500px] p-4 rounded-lg item flex flex-col gap-2 bg-white overflow-hidden">
      <Dialog>
        <DialogTrigger>
          <div class="p-5 h-[330px] w-full bg-[#ECEFF3] relative rounded-lg grid grid-cols-1 place-items-center overflow-hidden">
            <img :src="props.item.picture" alt="" class="w-auto h-auto max-w-full max-h-full object-contain">
          </div>
        </DialogTrigger>
        <DialogContent class="h-[731px] w-[1304px] !max-w-none">
          <DialogDescription class="grid grid-cols-1 place-items-center items-center">
            <div class="grid items-center grid-cols-2 grid-rows-1 place-items-center gap-8 w-[1028px]">
              <div class="w-[392px] h-[440px] p-0.5 bg-[#E4E7EB] rounded-lg grid grid-cols-1 place-items-center overflow-hidden">
                <img :src="props.item.picture" alt=""/>
              </div>
              <div class="p-4">
                <h3 class="header32 text-black mb-3">{{ props.item.name }}</h3>
                <p class="text16_light text-[#484848] mb-6">{{ props.item.description }}</p>
                <div>
                  <div class="flex flex-col items-end gap-5 mt-8">
                    <h3 class="header32 text-black">{{ props.item.price }}₽</h3>
                    <button @click="handlerClick(props.item.id)" class="text-3xl cart__btn py-2 important">
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <p class="font-medium text-base truncate">{{ props.item.price }}₽</p>
      <p class="font-medium text-xs truncate">{{ props.item.name }}</p>
      <p class="font-medium text-xs text-slate-500 truncate">{{ props.item.author }}</p>
      <div>
        <div class="flex gap-2">
          <button @click="handlerClick(props.item.id)" class="cart__btn">В корзину</button>
          <button @click="toggleFavorite" class="bookmark__btn !important">
            <img :src="favoriteStore.isFavorite(props.item.id) ? '/redhui.svg' : '/hui.svg'" alt="Избранное">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.cart__btn{
  display: flex;
  color: white;
  font-size: 12px;
  font-weight: 500;
  width: 100%;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--main-color);
  border-radius: 5px;
}
.bookmark__btn{
  padding: 6px;
  background: var(--main-color);
  border-radius: 5px;
}
</style>