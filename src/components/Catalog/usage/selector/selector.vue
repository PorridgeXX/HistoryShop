<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <Select >
    <SelectTrigger class = "w-[200px]">
      <SelectValue placeholder="Сортировать по" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="popularity">
          По популярности
        </SelectItem>
        <SelectItem value="price-up">
          По цене↑
        </SelectItem>
        <SelectItem value="price-down">
          По цене↓
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<style scoped>

</style>