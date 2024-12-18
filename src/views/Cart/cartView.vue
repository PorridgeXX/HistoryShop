<script setup>
/* ==================================================
   Imports
   ================================================== */
import { onMounted } from "vue";
import Cart from '@/components/Cart/cart.vue';
import { useCartStore } from "@/components/Cart/js/cart.js";

/* ==================================================
   State
   ================================================== */
const store = useCartStore();

/* ==================================================
   Lifecycle hooks
   ================================================== */
onMounted(() => {
  store.loadCart();
});
</script>


<template>
  <Cart/>
</template>

<style scoped>

</style>