<script setup>

import { Textarea } from '@/components/ui/textarea/index.js'
import {Button} from "@/components/ui/button/index.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/index.js'
import { Input } from '@/components/ui/input/index.js'
import { Label } from '@/components/ui/label/index.js'
import CountrySelector from "@/views/adminPanel/usage/itemsControl/usage/countrySelector/countrySelector.vue"
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";
import CategorySelector from "@/views/adminPanel/usage/itemsControl/usage/categorySelector/categorySelector.vue";
import {ref} from "vue";

const addItemStore = useAddItemStore();
const name = ref('')
const description = ref('')
const price = ref(0)
const year = ref(0)

const clickHandler = async () => {
  addItemStore.name = name.value
  addItemStore.description = description.value
  addItemStore.price = parseInt(price.value)
  addItemStore.year = parseInt(year.value)
  await addItemStore.createItem()
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <div class = "flex items-center mb-3">
        <p>Добавить товар</p>
        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m5.5 10.5h10"/><path d="m10.5 5.5v10"/></g></svg>
      </div>
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
          <CountrySelector/>
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="name" class="text-right ">
            Категория
          </Label>
          <CategorySelector/>
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
          Добавить
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>