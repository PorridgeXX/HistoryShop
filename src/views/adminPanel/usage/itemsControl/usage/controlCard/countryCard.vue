<script setup>
import {Button} from "@/components/ui/button/index.js";
const props = defineProps({
  country: Array,
})
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";
const store = useAddItemStore();
import EditCountry from "@/views/adminPanel/usage/itemsControl/usage/Dialogs/country/editCountry/editCountry.vue";
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