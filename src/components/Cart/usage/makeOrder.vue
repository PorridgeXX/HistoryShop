<script setup>
// components import
import {Input} from "@/components/ui/input/index.js";
import {Label} from "@/components/ui/label/index.js";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group/index.js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/index.js";
import {Checkbox} from "@/components/ui/checkbox/index.js";
import {useUiStore} from "@/components/Cart/js/ui.js";
import {useCartStore} from "@/components/Cart/js/cart.js";
// Stores
const store = useCartStore();
const uiStore = useUiStore();

// yup import
import * as yup from "yup";

// vue imports
import {ref, computed} from "vue";

// Form state variables
const nameInput = ref("");
const emailInput = ref("");
const selector = ref("");
const emailError = ref("");

// Email validation schema
const emailSchema = yup.string().email("Некорректный формат email").required("Введите email");

// Validate email
const validateEmail = async () => {
  try {
    await emailSchema.validate(emailInput.value);
    emailError.value = "";
  } catch (error) {
    emailError.value = error.message;
  }
};

// Check if the form is valid
const isFormValid = computed(() => {
  return (
      nameInput.value.trim() !== "" &&
      !emailError.value &&
      selector.value.trim() !== "" &&
      store.checkedList.length > 0 // Проверка, что есть выбранные товары
  );
});


// Click handler for "Оформить заказ"
const clickHandler = () => {
  if (!isFormValid.value) return;
  uiStore.isDialogOpen = true;
  store.makeOrder();
};
</script>

<template>
  <div class="mt-8">
    <h3 class="text-2xl font-bold mb-8">Оформление заказа</h3>
    <div class="p-10 max-h-[555px] bg-white rounded-lg shadow flex flex-col gap-8">
      <!-- Name Input -->
      <div class="flex gap-8">
        <div class="flex flex-col gap-1 w-full max-w-sm">
          <div class="flex justify-between">
            <Label for="name">Имя</Label>
            <span v-if="!nameInput" class="text-pink-500">*</span>
          </div>
          <Input
              v-model="nameInput"
              id="name"
              class="w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder=""
              type="text"
          />
        </div>

        <!-- Email Input -->
        <div class="flex flex-col gap-1 w-full max-w-sm">
          <div class="flex justify-between">
            <Label for="email">E-mail</Label>
            <span v-if="!emailInput" class="text-pink-500">*</span>
          </div>
          <Input
              v-model="emailInput"
              @input="validateEmail"
              id="email"
              class="w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder=""
              type="email"
          />
          <span v-if="emailError" class="text-sm text-pink-500">{{ emailError }}</span>
        </div>
      </div>

      <!-- Radio Group -->
      <div>
        <RadioGroup class="flex gap-8" default-value="option-one">
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-one" value="option-one"/>
            <Label for="option-one">Самовывоз</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="option-two" value="option-two"/>
            <Label for="option-two">Доставка</Label>
          </div>
        </RadioGroup>
      </div>

      <!-- Payment Method Selector -->
      <div>
        <div class="flex justify-between items-center">
          <Label>Способ оплаты</Label>
          <span v-if="!selector" class="text-pink-500">*</span>
        </div>
        <Select v-model="selector">
          <SelectTrigger class="w-full h-12 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Не выбрано"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cash">Оплата наличными/картой при получении</SelectItem>
              <SelectItem value="online">Оплата онлайн</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <!-- Packaging Option -->
      <div class="flex items-center gap-3">
        <Checkbox/>
        <Label>Нужна упаковка</Label>
      </div>

      <!-- Submit Button -->
      <div>
        <button
            @click="clickHandler"
            :disabled="!isFormValid"
            class="w-48 h-12 flex items-center justify-center text-white bg-indigo-500 rounded-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ошибка */
.text-pink-500 {
  font-size: 0.875rem;
}
</style>
