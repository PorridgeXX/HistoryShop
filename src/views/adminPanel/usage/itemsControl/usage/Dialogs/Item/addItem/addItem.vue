<script setup lang="ts">
/* ==================================================
   Imports
   ================================================== */
import { Textarea } from '@/components/ui/textarea/index.js';
import { Button } from '@/components/ui/button/index.js';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/index.js';
import { Input } from '@/components/ui/input/index.js';
import { Label } from '@/components/ui/label/index.js';
import { ref } from 'vue';
import { useAddItemStore } from '@/API/addItem.js';
import CountrySelector from "@/views/adminPanel/usage/itemsControl/usage/countrySelector/countrySelector.vue";
import CategorySelector from "@/views/adminPanel/usage/itemsControl/usage/categorySelector/categorySelector.vue";

/* ==================================================
   State
   ================================================== */
const addItemStore = useAddItemStore();
const name = ref<string>(''); // Название товара
const description = ref<string>(''); // Описание товара
const price = ref<number>(); // Цена
const year = ref<number>(); // Год производства товара

/* ==================================================
   Handlers
   ================================================== */
const clickHandler = async () => {
  try {
    // Сохранение данных в хранилище
    addItemStore.name = name.value;
    addItemStore.description = description.value;
    addItemStore.price = parseInt(price.value.toString());
    addItemStore.year = parseInt(year.value.toString());

    // Вызов метода для создания товара
    await addItemStore.createItem();

    name.value = ""
    description.value = ""
    price.value = null
    year.value = null
    addItemStore.pciture = ""
  } catch (error) {
    console.error('Ошибка при создании товара:', error);
  }
};
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