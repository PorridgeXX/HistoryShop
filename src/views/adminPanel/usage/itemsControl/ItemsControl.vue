<script setup>
import {ScrollArea} from '@/components/ui/scroll-area'
import {useFetchGoodsStore} from "@/stores/fetchGoods.js";
import {getCategories} from "@/API/catalogRequests.js";
import {getCountries} from "@/API/catalogRequests.js";
import ControlCard from "@/views/adminPanel/usage/itemsControl/usage/controlCard/itemCard.vue";
import {onMounted, ref, watch} from "vue";
import AddItem from "@/views/adminPanel/usage/itemsControl/usage/Dialogs/Item/addItem/addItem.vue";
import CategorySelector from "@/views/adminPanel/usage/itemsControl/usage/categorySelector/categorySelector.vue";
import CountryCard from "@/views/adminPanel/usage/itemsControl/usage/controlCard/countryCard.vue";
import CategoryCard from "@/views/adminPanel/usage/itemsControl/usage/controlCard/categoryCard.vue";
import AddCategory from "@/views/adminPanel/usage/itemsControl/usage/Dialogs/category/addCategory/addCategory.vue";
import AddCountry from "@/views/adminPanel/usage/itemsControl/usage/Dialogs/country/addCountry/addCountry.vue";
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";
const store = useFetchGoodsStore();
const controlStore = useAddItemStore()
const countries = ref(controlStore.countries)
const categories = ref(controlStore.categories)
const res = ref()

watch(() => controlStore.countries, (newCountries) => {
        countries.value = newCountries;
    }
)
watch(() => controlStore.categories, (newCategories) => {
      categories.value = newCategories;
    }
)

onMounted(async () => {
  await store.fetchAllGoods({pageSize: 150})
  await getCategories()
  await getCountries()
  countries.value = controlStore.countries
  categories.value = controlStore.categories
  console.log(controlStore.categories)
})

</script>

<template>
  <div class = "grid grid-cols-1 h-screen place-items-center gap-5 place-content-center ">
    <div class="grid grid-rows-1">
      <AddItem />
      <ScrollArea class="h-[500px] w-[1000px] rounded-md border p-4">
        <ControlCard v-for = "item in store.productList" :key="item.id" :item = "item" />
      </ScrollArea>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <AddCountry/>
        <ScrollArea class="h-[200px] w-[450px] rounded-md border p-4">
          <div v-for = "country in countries" :key = "country.id" >
            <CountryCard :country = "country"/>
          </div>
        </ScrollArea>
      </div>

      <div>
      <AddCategory />

      <ScrollArea class="h-[200px] w-[450px] rounded-md border p-4">
        <div v-for = "category in categories" :key = "category.id" >
          <CategoryCard :category = "category"/>
        </div>
      </ScrollArea>
      </div>
    </div>
  </div>

</template>