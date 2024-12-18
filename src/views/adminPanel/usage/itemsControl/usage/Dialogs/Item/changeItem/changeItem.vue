<script setup>

import {Textarea} from '@/components/ui/textarea/index.js'
import {Button} from "@/components/ui/button/index.js";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/index.js'
import {Input} from '@/components/ui/input/index.js'
import {Label} from '@/components/ui/label/index.js'
import CountrySelector from "@/views/adminPanel/usage/itemsControl/usage/countrySelector/countrySelector.vue"
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";
import CategorySelector from "@/views/adminPanel/usage/itemsControl/usage/categorySelector/categorySelector.vue";
import {ref, onMounted, watch} from "vue";

const props = defineProps({
  itemID: Number,
})
const fetchCurrentItem = async () => {
  currentItem.value = await addItemStore.getCurrentItem(props.itemID)
  console.log(currentItem.value)
}
const currentItem = ref()
const addItemStore = useAddItemStore();

const name = ref();
const description = ref();
const price = ref()
const year = ref()
const country = ref()
const category = ref()
const picture = ref()
watch(currentItem, (newValue) => {
  if (newValue) {
    name.value = newValue.name;
    description.value = newValue.description;
    price.value = newValue.price;
    year.value = newValue.year;
    country.value = newValue.countryId;
    category.value = newValue.categoryId;
    picture.value = newValue.picture;
    console.log(newValue);
  }
});

const clickHandler = async () => {
  addItemStore.name = name.value
  addItemStore.description = description.value
  addItemStore.price = parseInt(price.value)
  addItemStore.year = parseInt(year.value)
  addItemStore.newPicture = picture.value

  await addItemStore.changeItem(props.itemID)
}


</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button @click = "fetchCurrentItem">Изменить</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] bg-black text-white">
      <DialogHeader>
        <DialogTitle>Добавление товара</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right ">
            Название
          </Label>
          <Input v-model = "name"   class="col-span-3 bg-black" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right ">
            Описание
          </Label>
          <Textarea v-model = "description"   class="col-span-3 bg-black" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right ">
            Цена
          </Label>
          <Input v-model = "price"  class="col-span-3 bg-black" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right ">
            Год
          </Label>
          <Input v-model = "year"  class="col-span-3 bg-black" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right ">
            Страна
          </Label>
          <CountrySelector :country="country" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right ">
            Категория
          </Label>
          <CategorySelector :category="category" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right ">
            Картинка
          </Label>
          <Input type = "file" @change = "addItemStore.fetchImage" class="col-span-3 bg-black" />
        </div>
      </div>
      <DialogFooter>
        <Button @click = "clickHandler" type="submit">
          Изменить
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>