<script setup>
import Header from "@/views/adminPanel/usage/header/header.vue"
import ItemsControl from "@/views/adminPanel/usage/itemsControl/ItemsControl.vue";
import {useLoginStore} from "@/API/loginRequests.js";
import {onMounted, ref} from "vue";

const store = useLoginStore();
const isAdmin = ref(false)
onMounted(() => {

})
</script>

<template>
  <Header></Header>
  <ItemsControl></ItemsControl>
</template>


<style scoped>
body {
  background-color: black;
  color: white;
}
</style>