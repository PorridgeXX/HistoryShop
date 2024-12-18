<script setup>
//components imports
import Slider from "@/components/Catalog/usage/slider/slider.vue";
import Card from "@/components/Catalog/usage/card/card.vue"
import Selector from "@/components/Catalog/usage/selector/selector.vue"
import Pagination from "@/components/Catalog/usage/pagination/pagination.vue"

//API import
import {useFetchGoodsStore} from "@/stores/fetchGoods.js"
import {onMounted} from "vue";
import Filter from "@/components/Catalog/usage/filter/Filter.vue"
const GoodsStore = useFetchGoodsStore()
import {getCategories} from "@/API/catalogRequests.js";

onMounted(async () => {
  await GoodsStore.fetchAllGoods()
})
</script>

<template>
  <Slider/>
  <h3 class = "mt-16 font-bold text-2 text-3xl border-b p-3 mb-6">Антиквариат этого периода</h3>
  <div class = "flex gap-4">
  <div class = "grid grid-cols-3 mt-9">
    <Card v-for = "item in GoodsStore.productList" :key = "item.id" :item = "item" />
  </div>
    <Filter/>
  </div>
  <Pagination class = "grid grid-cols-1 place-items-center mb-3 "/>
</template>

<style scoped>

</style>