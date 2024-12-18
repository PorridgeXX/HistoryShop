<script setup>
/* ==================================================
   Imports
   ================================================== */
// Vue Composition API
import { onMounted } from "vue";

// Store Imports
import { useFetchGoodsStore } from "@/stores/fetchGoods.js";

// API Imports
import { getCategories } from "@/API/catalogRequests.js";

// Component Imports
import Slider from "@/components/Catalog/usage/slider/slider.vue";
import Card from "@/components/Catalog/usage/card/card.vue";
import Pagination from "@/components/Catalog/usage/pagination/pagination.vue";
import Placeholder from "@/components/Catalog/usage/placeholder/placeholder.vue";
import Filter from "@/components/Catalog/usage/filter/Filter.vue";

/* ==================================================
   Variables
   ================================================== */
const GoodsStore = useFetchGoodsStore();

/* ==================================================
   Lifecycle Hooks
   ================================================== */
onMounted(async () => {
  GoodsStore.range = [1600, 2024];
  await GoodsStore.fetchAllGoods();
});
</script>


<template>
  <Slider/>
  <h3 class = "mt-16 font-bold text-2 text-3xl border-b p-3 mb-6">Антиквариат этого периода</h3>
  <div class = "flex gap-4">
  <div class = "grid grid-cols-3 mt-9">
    <Card  v-for = "item in GoodsStore.productList" :key = "item.id" :item = "item" />
    <Placeholder v-if = "!GoodsStore.productList"/>
  </div>
    <Filter/>
  </div>
  <Pagination v-if = "GoodsStore.productList" class = "grid grid-cols-1 place-items-center mb-3 "/>

</template>

<style scoped>

</style>