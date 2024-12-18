<script setup>
/* ==================================================
   Imports
   ================================================== */
// Vue Composition API
import { onMounted, ref } from "vue";

// Router
import { useRouter } from "vue-router";

// UI Imports
import { Checkbox } from "@/components/ui/checkbox/index.js";
import { Button } from "@/components/ui/button/index.js";

// API Imports
import { getCategories, getCountries } from "@/API/catalogRequests.js";

// Store Imports
import { useFetchGoodsStore } from "@/stores/fetchGoods.js";

/* ==================================================
   Reactive State
   ================================================== */
const categories = ref();
const countries = ref();
const addedCategories = ref([]);
const addedCountries = ref([]);
const checkBoxState = ref({});
const store = useFetchGoodsStore();
const router = useRouter();

/* ==================================================
   Methods
   ================================================== */
const addCategory = (category) => {
  const isChecked = checkBoxState.value[category];
  checkBoxState.value[category] = !isChecked;
  if (!isChecked) {
    addedCategories.value.push(category);
    console.log(category);
  } else {
    addedCategories.value = addedCategories.value.filter((item) => item !== category);
  }
};

const addCountry = (country) => {
  const isChecked = checkBoxState.value[country];
  checkBoxState.value[country] = !isChecked;
  if (!isChecked) {
    addedCountries.value.push(country);
    console.log(country);
  } else {
    addedCountries.value = addedCountries.value.filter((item) => item !== country);
  }
};

const sendFilter = async () => {
  store.categories = addedCategories.value;
  store.countries = addedCountries.value;
  await store.fetchAllGoods();
  await router.replace({ query: { page: 1 } });
};

const resetFilter = async () => {
  addedCategories.value = [];
  console.log(checkBoxState.value, 'до');

  for (let key in checkBoxState.value) {
    checkBoxState.value[key] = false;
  }

  console.log(checkBoxState.value, 'после');

  addedCountries.value = [];
  store.countries = [];
  store.categories = [];

  await store.fetchAllGoods();
};

/* ==================================================
   Lifecycle Hook
   ================================================== */
onMounted(async () => {
  const res = await getCategories();
  const res2 = await getCountries();

  categories.value = res.map((item) => item[0]);
  countries.value = res2.map((item) => item[0]);

  console.log(res);
});
</script>


<template>
  <div class="ml-4 min-w-[270px]">
    <h1 class="header32 filter_name">Выбрать фильтры</h1>
    <div class="mt-3">
      <h3 class="header20 flex">Страна </h3>
      <ul v-for="country in countries">
        <li>
          <Checkbox :checked="checkBoxState[country]" @click="addCountry(country)"/>
          {{ country }}
        </li>
      </ul>
    </div>
    <div>
      <h3 class="header20 mt-3">Категория товара</h3>
      <ul v-for="(category, value) in categories" :key="value">
        <li>
          <Checkbox @click="addCategory(category)" :checked="checkBoxState[category]"/>
          {{ category }}
        </li>
      </ul>
    </div>
    <div class = "flex gap-2">
      <Button class="mt-3" @click="sendFilter()">Применить</Button>
      <Button class="mt-3 bg-white text-black resetBtn" @click="resetFilter()">Сбросить</Button>
    </div>
  </div>
</template>

<style scoped>
.filter_name {
  border-bottom: solid 1px black;
}
.resetBtn:hover {
  background-color: #fff;
}
</style>