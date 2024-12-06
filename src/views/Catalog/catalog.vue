<script setup>
import { Slider } from '@/components/ui/slider'
import { ref } from 'vue'
</script>

<template>
  <div class = "mt-10">
    <div class = "container">
      <Slider
          :min="1"
          :max="100"
          :step="1"
      />
    </div>
  </div>


</template>

<style scoped>

</style>