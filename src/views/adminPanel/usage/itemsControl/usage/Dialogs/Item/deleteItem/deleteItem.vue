<script setup lang="ts">
/* ==================================================
   Imports
   ================================================== */
import { Button } from "@/components/ui/button/index.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog/index.js';
import { useAddItemStore } from "@/API/addItem.js";
import { ref } from "vue";

/* ==================================================
   Props
   ================================================== */
const props = defineProps({
  itemID: {
    type: Number,
    required: true,
  },
});

/* ==================================================
   State
   ================================================== */
const store = useAddItemStore();
const isOpen = ref(false);

/* ==================================================
   Methods
   ================================================== */
const openDialog = () => {
  isOpen.value = true;
};

const closeDialog = () => {
  isOpen.value = false;
};

const handleDelete = async () => {
  try {
    await store.deleteItem(props.itemID);
    console.log("Item successfully deleted");
    closeDialog();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
</script>


<template>
  <AlertDialog >
    <AlertDialogTrigger><Button>Удалить</Button></AlertDialogTrigger>
    <AlertDialogContent class = "bg-black text-white">
      <AlertDialogHeader>
        <AlertDialogTitle>Вы уверены, что хотите удалить товар?</AlertDialogTitle>
        <AlertDialogDescription>
          Это действие не может быть отменено.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class = "text-black">Отменить</AlertDialogCancel>
        <AlertDialogAction @click = "store.deleteItem(props.itemID)">Удалить</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>