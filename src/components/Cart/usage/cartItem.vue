<script setup>
//stores
import {useCartStore} from "@/components/Cart/js/cart.js";

//components imports
import { Checkbox } from '@/components/ui/checkbox'
import {ref} from "vue";

//const
const store = useCartStore();
const props = defineProps({
  cartItem: {
    type: Object
  }
})

const checked = ref(false)
const handleChange = (e) => {
    checked.value = !checked.value
    store.checker(e, checked.value)
}
</script>

<template>
  <div class="flex justify-between items-center w-full bg-gray-50 rounded-lg p-4 shadow-sm">
    <div class="flex items-center gap-6">
      <Checkbox v-model = "checked" @click = "handleChange(cartItem.id)"/>
      <div class="w-[115px] h-[115px] bg-gray-200 rounded-lg grid place-items-center">
        <img class="w-[75px]" :src="cartItem.picture" alt="">
      </div>
      <p class="text-gray-800 font-medium">{{ cartItem.name }}</p>
    </div>

    <div class="flex flex-col items-end">

      <p class="text-lg font-semibold text-gray-800">{{ cartItem.price }}₽</p>

      <img
          @click="store.removeFromCart(cartItem.id)"
          class="w-[10px] cursor-pointer mt-2"
          src="/deleteAll.svg"
          alt="Удалить"
      />
    </div>
  </div>
</template>


<style scoped>
.cartItem {
  position: relative;
}
.cartItem::after {
  content: "";
  width: 110%;
  height: 2px;
  background-color: #A6A6A6;
  position: absolute;
  top: 155px;
  left: 50%; /* Смещаем на середину родителя */
  transform: translateX(-50%); /* Центрируем по оси X */
}
</style>