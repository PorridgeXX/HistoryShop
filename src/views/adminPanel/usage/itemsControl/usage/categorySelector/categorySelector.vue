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
import {getCategories} from "@/API/catalogRequests.js";
import {onMounted, ref, watch} from "vue";
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";

const props = defineProps({
  category: {
    type: String,
  }
})

const store = useAddItemStore();
const categories = ref()
const selectedCategories = ref(props.category)

watch(() => props.category, (newValue) => {
  selectedCategories.value = newValue;
})

watch(
    selectedCategories,
    (newValue) => {
      store.category = newValue;
      console.log(store.category);
    }
)
onMounted(async () => {
  const res = await getCategories()
  categories.value = res.map(item => ({name: item[0], id: item[1]}))
})
</script>

<template>
  <Select v-model = "selectedCategories">
    <SelectTrigger class="w-[180px] bg-black text-white">
      <SelectValue placeholder="Выбрать категорию" />
    </SelectTrigger>
    <SelectContent class="w-[180px] bg-black text-white">
      <SelectGroup >
        <SelectItem v-for = "category in categories" :key = "category.id" :value="category.id">
          {{category.name}}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped>

</style>