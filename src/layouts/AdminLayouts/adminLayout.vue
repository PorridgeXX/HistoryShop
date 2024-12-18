<script setup>
/* ==================================================
   Imports
   ================================================== */
import { Toaster } from '@/components/ui/toast';
import { useLoginStore } from '@/API/loginRequests.js';
import { onMounted } from 'vue';

/* ==================================================
   Reactive State
   ================================================== */
const store = useLoginStore();
</script>


<template>
  <div class="wrapper">
    <div class="main-content">
      <router-view></router-view>
    </div>
    <Toaster/>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: black;
  color: white;
}
.main-content{
  min-height: 90vh;
  flex: 1 1 auto;
}

</style>
