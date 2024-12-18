<script setup>
import {Button} from "@/components/ui/button"
import DeleteItem from "@/views/adminPanel/usage/itemsControl/usage/Dialogs/Item/deleteItem/deleteItem.vue";
import ChangeItem from "@/views/adminPanel/usage/itemsControl/usage/Dialogs/Item/changeItem/changeItem.vue";

const props = defineProps({
  item: {
    type: Object
  }
})
</script>

<template>
  <div class="flex mb-4 border-b items-center justify-between p-4 border-white">
    <div class="flex gap-3 items-center">
      <p>{{ props.item.id }}</p>
      <img class="w-[50px]" :src="props.item.picture" alt="">
      <p>{{ props.item.name }}</p>
    </div>
    <div class="flex gap-4 items-center">
      <ChangeItem :itemID="props.item.id"></ChangeItem>
      <DeleteItem :itemID="props.item.id"/>

    </div>
  </div>
</template>

<style scoped>

</style>