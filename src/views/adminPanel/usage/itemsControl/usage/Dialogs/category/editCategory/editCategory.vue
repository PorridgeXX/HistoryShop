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
const props = defineProps({
  id: {
    type: Number,
  }
})
const store = useAddItemStore();
</script>

<template>
  <Dialog>
    <DialogTrigger>
    <Button>Изменить</Button>
    </DialogTrigger>
    <DialogContent class = "bg-black text-white">
      <DialogHeader>
        <DialogTitle>Изменить категорию</DialogTitle>
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
        <Button @click = "store.changeCategory(props.id, name)">Изменить</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>