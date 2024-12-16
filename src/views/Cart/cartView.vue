<script setup>
import Cart from '@/components/Cart/cart.vue'
import {onMounted} from "vue";
import {useCartStore} from "@/components/Cart/js/cart.js";

const store = useCartStore();

onMounted(() => {
  store.loadCart();
})
</script>

<template>
  <Cart/>
</template>

<style scoped>

</style>