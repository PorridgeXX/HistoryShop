<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {useRouter} from "vue-router";
import {Button} from "@/components/ui/button/index.js";
import {getProfile} from "@/views/Profile/js/fetchProfile.js";
import {onMounted, ref} from "vue";
import {useLoginStore} from "@/API/loginRequests.js";
const store = useLoginStore();
let email = ref("");
let username = ref("");
const router = useRouter();
const fetchProfile = async () => {
  const profile = await getProfile();
  email.value = profile.email;
  username.value = profile.username;
  console.log(username);
}
const handler = () => {
  store.logout()
  router.push("/main")
}
onMounted(() => {
  fetchProfile();
  console.log(getProfile());
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