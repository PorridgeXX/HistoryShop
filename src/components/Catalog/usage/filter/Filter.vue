<script setup>
import {getCategories, getCountries} from "@/API/goods.js";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Checkbox} from "@/components/ui/checkbox/index.js";
import {Button} from "@/components/ui/button/index.js";
import {useFetchGoodsStore} from "@/stores/fetchGoods.js";

const categories = ref();
const route = useRoute();
const router = useRouter();
const countries = ref();
const addedCategories = ref([]);
const addedCountries = ref([]);
const store = useFetchGoodsStore();

const checkBoxState = ref({})

const addCategory = (category) => {
  const isChecked = checkBoxState.value[category]
  checkBoxState.value[category] = !isChecked;
  if (!isChecked) {
    addedCategories.value.push(category);
    console.log(category);
  } else {
    addedCategories.value = addedCategories.value.filter((item) => item !== category);
  }

}
const addCountry = (contry) => {
  const isChecked = checkBoxState.value[contry]
  checkBoxState.value[contry] = !isChecked;
  if (!isChecked) {
    addedCountries.value.push(contry);
    console.log(contry);
  } else {
    addedCountries.value = addedCategories.value.filter((item) => item !== contry);
  }

}
const sendFilter = async () => {
  store.categories = addedCategories.value;
  store.countries = addedCountries.value;
  await store.fetchAllGoods();
  await router.replace({query: {page: 1}});
}
const resetFilter = async () => {
  addedCategories.value = []
  console.log(checkBoxState.value, 'до')
  for (let key in checkBoxState.value) {
    checkBoxState.value[key] = false
  }
  console.log(checkBoxState.value, 'после')
  addedCountries.value = []
  store.countries = []
  store.categories = []
  await store.fetchAllGoods();
}


onMounted(async () => {
  const res = await getCategories();
  const res2 = await getCountries();
  categories.value = res;
  countries.value = res2;
  console.log(res2)
  console.log(res);
})

</script>

<template>
  <div class="ml-4">
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