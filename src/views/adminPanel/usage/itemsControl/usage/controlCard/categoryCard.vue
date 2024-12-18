<script setup>
/* ==================================================
   Imports
   ================================================== */
import { Button } from "@/components/ui/button/index.js";
import EditCategory from "@/views/adminPanel/usage/itemsControl/usage/Dialogs/category/editCategory/editCategory.vue";
import { useAddItemStore } from "@/API/addItem.js";

/* ==================================================
   Props
   ================================================== */
const props = defineProps({
  category: Array,
});

/* ==================================================
   State
   ================================================== */
const store = useAddItemStore();
</script>


<template>
  <div class = "flex justify-between items-center mt-3">
    <div class = "flex gap-2 items-center">
      <p>{{category[1]}}</p>
      <p>{{category[0]}}</p>
    </div>
    <div class = "flex gap-2 items-center">
      <EditCategory :id = "category[1]"/>
      <Button @click = "store.deleteCategory(category[1])">Удалить</Button>
    </div>
  </div>

</template>

<style scoped>

</style>