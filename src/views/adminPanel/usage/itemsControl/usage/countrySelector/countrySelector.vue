<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {getCountries} from "@/API/catalogRequests.js";
import {onMounted, ref, watch} from "vue";
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";

const store = useAddItemStore();
const props = defineProps({
  country: {
    type: String,
  }
})
const countries = ref()
console.log()
const selectedCountries = ref(props.country)

watch(() => props.country, (country) => {
  selectedCountries.value = country
})
watch(selectedCountries, (newValue) => {
  store.country = newValue;
  console.log(newValue);
})
onMounted(async () => {
  const res = await getCountries()
  countries.value = res.map(item => ({name: item[0], id: item[1]}))
})
</script>

<template>
  <Select v-model="selectedCountries">
    <SelectTrigger class="w-[180px] bg-black text-white">
      <SelectValue placeholder="Выбрать страну"/>
    </SelectTrigger>
    <SelectContent class="w-[180px] bg-black text-white">
      <SelectGroup>
        <SelectItem v-for="country in countries" :key="country.id" :value="country.id">
          {{ country.name }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped>

</style>