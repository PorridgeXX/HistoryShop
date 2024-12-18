<script setup>
/* ==================================================
   Imports
   ================================================== */
import { Button } from "@/components/ui/button/index.js";
import { useAddItemStore } from "@/API/addItem.js";
import EditCountry from "@/views/adminPanel/usage/itemsControl/usage/Dialogs/country/editCountry/editCountry.vue";

/* ==================================================
   Props
   ================================================== */
const props = defineProps({
  country: Array,
});

/* ==================================================
   State
   ================================================== */
const store = useAddItemStore();
</script>


<template>
  <div class = "flex justify-between items-center mt-3">
    <div class = "flex gap-2 items-center">
    <p>{{country[1]}}</p>
    <p>{{country[0]}}</p>
    </div>
    <div class = "flex gap-2 items-center">
    <EditCountry :id="country[1]" />
    <Button @click = "store.deleteCountries(country[1])">Удалить</Button>
    </div>
  </div>

</template>

<style scoped>

</style>