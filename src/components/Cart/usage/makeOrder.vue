<script setup>
// components import
import { Input } from '@/components/ui/input/index.js';
import { Label } from '@/components/ui/label/index.js';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group/index.js';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/index.js';
import { Checkbox } from '@/components/ui/checkbox/index.js';
import {useUiStore} from "@/components/Cart/js/ui.js";
import {useCartStore} from "@/components/Cart/js/cart.js";
import modal from "@/components/Cart/usage/modal.vue"
const store = useCartStore();
const uiStore = useUiStore();
// yup import
import * as yup from "yup";

// vue imports
import { ref } from "vue";
import {Button} from "@/components/ui/button/index.js";


// variables
const nameInput = ref('');
const emailInput = ref('');
const selector = ref('');
const emailError = ref('');

// Email validation schema
const emailSchema = yup.string().email("Некорректный формат email").required("Введите email");

// Function to validate email
const validateEmail = async () => {
  try {
    await emailSchema.validate(emailInput.value);
    emailError.value = '';
  } catch (error) {
    emailError.value = error.message;
  }
};

const clickHandler = () => {
  uiStore.isDialogOpen = true
  store.makeOrder()
}
</script>

<template>
  <div class="mt-8">
    <h3 class="header32 mb-8">Оформление заказа</h3>
    <div class=" p-10 max-h-[555px] bg-white rounded-lg flex flex-col gap-8">
      <div class="flex gap-8">
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <div class=" w-[286px] flex justify-between">
            <Label for="email">Имя</Label>
            <span v-if="!nameInput" class="text-[#FF60C3] h-0.5">*</span>
          </div>
          <Input v-model="nameInput" class="w-[286px] bg-[#E4E7EB] focus:outline-none focus:ring-0" placeholder=""
                 type="text"/>
          <div class="error-placeholder"></div> <!-- Пустое место для ошибки -->
        </div>
        <div class="grid w-full max-w-sm items-center gap-1.5">
          <div class="flex w-[286px] justify-between">
            <Label for="email">E-mail</Label>
            <span v-if="!emailInput" class="text-[#FF60C3] h-0.5">*</span>
          </div>
          <Input
              v-model="emailInput"
              @input="validateEmail"
              id="email"
              class="w-[286px] bg-[#E4E7EB] focus:outline-none focus:ring-0"
              placeholder=""
              type="email"
          />
          <div class="error-placeholder">
            <span v-if="emailError" class="text-[#FF60C3] text-sm">{{ emailError }}</span>
          </div>
        </div>
      </div>
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
      <div>
        <div class="w-[600px] items-center flex justify-between">
          <Label class="mt-2">Способ оплаты</Label>
          <span v-if="!selector" class="text-[#FF60C3] h-0.5">*</span>
        </div>
        <Select v-model="selector">
          <SelectTrigger class="w-[604px] h-[48px] bg-[#E4E7EB]">
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
      <div class="flex gap-3 items-center">
        <Checkbox/>
        <Label>Нужна упаковка</Label>
      </div>
      <div>
            <button
                @click = "clickHandler()"
                class="cart__btn">
              Оформить заказ
            </button>
      </div>
    </div>
  </div>


</template>

<style scoped>
.cart__btn {
  display: flex;
  align-items: center;
  gap: 9px;
  color: white;
  padding: 0 32px;
  max-width: 193px;
  height: 48px;
  justify-content: center;
  border-radius: 8px;
  background: var(--main-color);
}

.input:active, .input:hover, .input:focus {
  border: none !important;
}

/* Фиксированный размер для ошибки */
.error-placeholder {
  min-height: 20px; /* Устанавливаем фиксированное пространство */
  font-size: 0.875rem; /* Размер текста для ошибок */
}

.text-sm {
  font-size: 0.875rem;
}
</style>
