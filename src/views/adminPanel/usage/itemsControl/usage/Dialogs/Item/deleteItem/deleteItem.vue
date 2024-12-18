<script setup>
import {Button} from "@/components/ui/button/index.js"
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
} from '@/components/ui/alert-dialog/index.js'
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";
const store = useAddItemStore();

const props = defineProps({
  itemID: Number,
})
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