<script setup>
import { cn } from '@/lib/utils';
import {useFetchGoodsStore} from "@/stores/fetchGoods.js";
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed } from 'vue';
import {useRouter} from "vue-router";

const store = useFetchGoodsStore()

const props = defineProps({
  name: { type: String, required: false },
  range: {type: Object, required: false},
  defaultValue: { type: Array, required: false },
  modelValue: { type: Array, required: false },
  disabled: { type: Boolean, required: false },
  orientation: { type: String, required: false },
  dir: { type: String, required: false },
  inverted: { type: Boolean, required: false },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
  step: { type: Number, required: false },
  minStepsBetweenThumbs: { type: Number, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});
const emits = defineEmits(['update:modelValue', 'valueCommit']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});
const router = useRouter();
const hui = async () => {
    store.range = props.range;
    await store.fetchAllGoods();
    await router.push({query: {page: 1}});
}
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SliderRoot
      :class="
      cn(
        'relative flex w-full touch-none select-none items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-full',
        props.class,
      )
    "
      v-bind="forwarded"
  >
    <SliderTrack
        class="relative h-2 w-full data-[orientation=vertical]:w-2 grow overflow-hidden rounded-full bg-gray-200"
    >
      <SliderRange
          class="absolute h-full data-[orientation=vertical]:w-full bg-gray-200"
      />
    </SliderTrack>
    <SliderThumb
        v-for="(value, key) in modelValue"
        @click = "hui()"
        :key="key"
        class="relative block h-5 w-5 rounded-full border-2 border-[var(--main-color)] bg-[var(--main-color)] outline-none ring-offset-[#4682B4] thumbYear"
    >
      <!-- Абсолютно позиционированный текст под Thumb -->
      <span
          class="absolute textStyle -bottom-6 left-1/2 transform -translate-x-1/2 text-xs"
      >
        {{ value }}
      </span>
    </SliderThumb>
  </SliderRoot>
</template>

<style scoped>
.textStyle {
  background-color: var(--main-color);
  padding: 1px 6px;
  border-radius: 20px;
  color: white;
}
</style>
