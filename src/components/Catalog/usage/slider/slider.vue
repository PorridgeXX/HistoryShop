<script setup>
import { Slider } from '@/components/ui/catalogSlider/index.js'
import { ref } from 'vue'

const range = ref([1600,2024])
console.log(typeof range)
</script>

<template>
  <div class = "mt-10">
      <Slider
          :min="1600"
          :range = range
          v-model = "range"
          :max="2024"
          :step="2"
      />
  </div>
</template>

<style scoped>

</style>