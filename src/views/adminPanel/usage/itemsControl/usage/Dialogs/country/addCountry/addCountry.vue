<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ref} from "vue";
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";
const name = ref('')

const store = useAddItemStore();
</script>
<template>
  <Dialog>
    <DialogTrigger>
      <div class = "flex items-center mb-3">
        <p>Добавить Страну</p>
        <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m5.5 10.5h10"/><path d="m10.5 5.5v10"/></g></svg>
      </div>
    </DialogTrigger>
    <DialogContent class = "bg-black text-white">
      <DialogHeader>
        <DialogTitle>Добавить страну</DialogTitle>
        <DialogDescription >
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right ">
              Название
            </Label>
            <Input v-model="name" class="col-span-3 bg-black text-white" />
          </div>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button @click = "store.addCountries(name)">Добавить</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>