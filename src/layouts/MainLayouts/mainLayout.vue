<script setup>
/* ==================================================
   Imports
   ================================================== */
import Header from '@/components/Header/header.vue';
import Footer from "@/components/Footer/footer.vue";
import { Toaster } from '@/components/ui/toast';
import { onMounted } from 'vue';
import { useLoginStore } from '@/API/loginRequests.js';

/* ==================================================
   Reactive State
   ================================================== */
const store = useLoginStore();

/* ==================================================
   Lifecycle Hooks
   ================================================== */
onMounted(() => {
  store.loginCheck();
});
</script>


<template>

  <div class="wrapper">
    <Header/>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <Toaster/>
    <Footer/>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.main-content{
  min-height: 90vh;
  flex: 1 1 auto;
}
</style>
