<script setup>
import {useUiStore} from "@/components/Cart/js/ui.js";

const uiStore = useUiStore();
const closeModal = () => {
  uiStore.isDialogOpen = false;
}
</script>

<template>
  <div
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-[700px]" @click.stop>
      <div class="flex flex-col items-center gap-4">
        <h3 class="header24 text-center">Спасибо за заказ!</h3>
        <p class="text16_light text-center">
          Мы свяжемся с вами в течение 10 минут, чтобы уточнить удобное для вас время доставки.
        </p>
        <button @click="closeModal" class="cart__btn mt-4">Ок</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>