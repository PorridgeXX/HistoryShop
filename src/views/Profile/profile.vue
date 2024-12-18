<script setup>
/* ==================================================
   Imports
   ================================================== */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from "@/components/ui/button/index.js"
import { useRouter } from "vue-router"
import { getProfile } from "@/API/fetchProfile.js"
import { onMounted, ref } from "vue"
import { useLoginStore } from "@/API/loginRequests.js"


/* ==================================================
   State
   ================================================== */
const store = useLoginStore()
const email = ref("")
const username = ref("")
const router = useRouter()


/* ==================================================
   Fetch Profile
   ================================================== */
const fetchProfile = async () => {
  try {
    const profile = await getProfile()
    email.value = profile.email
    username.value = profile.username
    console.log("User profile data fetched:", profile)
  } catch (error) {
    console.error("Ошибка при загрузке профиля:", error)
  }
}


/* ==================================================
   Handle Logout
   ================================================== */
const handler = () => {
  try {
    store.logout()
    router.push("/main")
  } catch (error) {
    console.error("Ошибка при выходе из системы:", error)
  }
}


/* ==================================================
   Lifecycle
   ================================================== */
onMounted(() => {
  fetchProfile()
})
</script>


<template>
  <div class = "h-screen grid grid-cols-1 place-items-center">
  <Card class = "w-[300px] h-[300px] flex flex-col justify-center items-center">
    <CardHeader>
      <CardTitle>Ваш профиль</CardTitle>
    </CardHeader>
    <CardContent>
      <p class = "mb-5">имя пользователя: {{username}}</p>
      <p>почта: {{ email }}</p>
    </CardContent>
    <CardFooter>
  <Button @click = "handler()">Выйти из профиля</Button>
    </CardFooter>
  </Card>
  </div>
</template>

<style scoped>

</style>