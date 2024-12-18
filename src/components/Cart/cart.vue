<script setup>
/* ==================================================
   Imports
   ================================================== */
// Store Imports
import { useCartStore } from "@/components/Cart/js/cart.js";
import { useUiStore } from "@/components/Cart/js/ui.js";

// Component Imports
import CartItem from "@/components/Cart/usage/cartItem.vue";
import CartPlaceholder from "@/components/Cart/usage/CartPlaceholder.vue";
import MakeOrder from "@/components/Cart/usage/makeOrder.vue";
import modal from "@/components/Cart/usage/modal.vue";

// Vue Composition API
import { onMounted } from "vue";

/* ==================================================
   Variables
   ================================================== */
const uiStore = useUiStore();
const store = useCartStore();

/* ==================================================
   Lifecycle Hooks
   ================================================== */
onMounted(() => {
  store.loadCart();
});

</script>

<template>
  <div class="container h-screen grid place-items-center bg-gray-100">
    <!-- Если корзина не пуста -->
    <div v-if="store.cart.length > 0" class="w-full max-w-5xl flex flex-col gap-6">
      <!-- Секция товаров -->
      <div class="bg-white rounded-lg p-8 flex flex-col gap-10">
        <div class="flex items-center justify-between border-b pb-4">
          <h3 class="header32 font-semibold text-gray-800">Корзина</h3>
          <a
              @click.prevent="store.deleteAll()"
              href="#"
              class="flex items-center text-sm font-medium gap-2"
          >
            Очистить
            <img class="w-4" src="/deleteAll.svg" alt="Очистить" />
          </a>
        </div>

        <div class="flex flex-col gap-6 border-b">
          <CartItem
              v-for="cartItem in store.cart"
              :key="cartItem.id"
              :cartItem="cartItem"
          />
        </div>
        <div class="header24 flex justify-end">
          <h3
              v-if="store.checkedList.length === 0"
          >
            {{ store.checkedList.length }} товаров на стоимость: {{ store.total }}₽
          </h3>
          <h3
              v-else-if="store.checkedList.length === 1"
          >
            {{ store.checkedList.length }} товар на стоимость: {{ store.total }}₽
          </h3>
          <h3
              v-else-if="store.checkedList.length > 1 && store.checkedList.length <= 4"
          >
            {{ store.checkedList.length }} товара на стоимость: {{ store.total }}₽
          </h3>
          <h3 v-else-if="store.checkedList.length > 4">
            {{ store.checkedList.length }} товаров на стоимость: {{ store.total }}₽
          </h3>
        </div>
      </div>

      <!-- Секция оформления заказа -->
      <div class="bg-white  rounded-lg p-8">
        <MakeOrder />
      </div>
    </div>
    <modal v-if = "uiStore.isDialogOpen"/>
    <!-- Если корзина пуста -->
    <div
        v-if="store.cart.length == 0"
        class="grid grid-cols-1 place-items-center gap-6 h-screen text-gray-600"
    >
      <CartPlaceholder />
    </div>
  </div>
</template>





<style scoped>

</style>