<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref, watch } from "vue"
import { registration } from '@/views/Login/js/reg'
import { useToast } from '@/components/ui/toast/use-toast'
import { login } from "@/views/Login/js/login"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import * as yup from 'yup' // Импорты для валидации

const { toast } = useToast()
import {useRouter} from "vue-router";

const router = useRouter()
const user = ref('')
const password = ref('')
const email = ref('')
const currentTab = ref('account')

// Схемы валидации
const loginSchema = yup.object({
  user: yup.string().required('Логин обязателен'),
  password: yup.string().required('Пароль обязателен'),
})

const registrationSchema = yup.object({
  user: yup.string().required('Логин обязателен'),
  email: yup.string().email('Неверный email').required('Email обязателен'),
  password: yup.string().min(3, 'Пароль должен быть не менее 3 символов').required('Пароль обязателен'),
})

// Переменные для ошибок
const errorsLogin = ref({ user: null, password: null })
const errorsRegister = ref({ user: null, email: null, password: null })

// Проверяем данные для входа
watch([user, password], async () => {
  try {
    await loginSchema.validate({ user: user.value, password: password.value })
    errorsLogin.value = { user: null, password: null }
  } catch (error: any) {
    errorsLogin.value = {
      user: error.path === 'user' ? error.message : null,
      password: error.path === 'password' ? error.message : null
    }
  }
})

// Проверяем данные для регистрации
watch([user, email, password], async () => {
  try {
    await registrationSchema.validate({ user: user.value, email: email.value, password: password.value })
    errorsRegister.value = { user: null, email: null, password: null }
  } catch (error: any) {
    errorsRegister.value = {
      user: error.path === 'user' ? error.message : null,
      email: error.path === 'email' ? error.message : null,
      password: error.path === 'password' ? error.message : null
    }
  }
})

const register = async () => {
  try {
    await registration(user.value, email.value, password.value)
    toast({
      title: 'Регистрация успешна',
      description: `Используйте введенные данные для входа`,
      duration: 2000,
    })
    currentTab.value = 'account'
  } catch (error) {
    console.error(error)
    toast({
      title: 'Ошибка регистрации',
      description: `Что-то пошло не так. Попробуйте позже.`,
      duration: 2000,
    })
  }
}

const logining = async () => {
  try {
    const res = await login(user.value, password.value)
    if (res === 401) {
      toast({
        title: 'Ошибка 401',
        description: `Неверные данные для входа`,
        duration: 2000,
      })
    } else {
      toast({
        title: 'Данные верны',
        duration: 2000,
      })
    }
    router.push('/catalog')
  } catch (error) {
    console.error(error)
    toast({
      title: 'Ошибка входа',
      description: `Что-то пошло не так. Попробуйте позже.`,
      duration: 2000,
    })
  }
}
</script>

<template>
  <div class="h-screen w-full grid grid-cols-1 place-items-center">
    <Tabs v-model="currentTab" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">Вход</TabsTrigger>
        <TabsTrigger value="register">Регистрация</TabsTrigger>
      </TabsList>

      <!-- Вход -->
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Вход в аккаунт</CardTitle>
            <CardDescription>Введите ваши данные для входа</CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="name">Логин</Label>
              <Input v-model="user" id="name" />
              <p v-if="errorsLogin.user" class="text-red-500 text-sm">{{ errorsLogin.user }}</p>
            </div>
            <div class="space-y-1">
              <Label for="password">Пароль</Label>
              <Input v-model="password" id="password" type="password" />
              <p v-if="errorsLogin.password" class="text-red-500 text-sm">{{ errorsLogin.password }}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button :disabled="!!errorsLogin.user || !!errorsLogin.password" @click="logining">Войти</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <!-- Регистрация -->
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>У вас нет аккаунта?</CardTitle>
            <CardDescription>Введите ваши данные для регистрации нового аккаунта</CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label for="user">Логин</Label>
              <Input v-model="user" id="user" />
              <p v-if="errorsRegister.user" class="text-red-500 text-sm">{{ errorsRegister.user }}</p>
            </div>
            <div class="space-y-1">
              <Label for="email">E-mail</Label>
              <Input v-model="email" id="email" placeholder="example@example.com" />
              <p v-if="errorsRegister.email" class="text-red-500 text-sm">{{ errorsRegister.email }}</p>
            </div>
            <div class="space-y-1">
              <Label for="password">Пароль</Label>
              <Input v-model="password" id="password" type="password" />
              <p v-if="errorsRegister.password" class="text-red-500 text-sm">{{ errorsRegister.password }}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button :disabled="!!errorsRegister.user || !!errorsRegister.email || !!errorsRegister.password" @click="register">Зарегистрироваться</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>