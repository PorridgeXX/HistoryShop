import { createRouter, createWebHistory } from 'vue-router'
import CatalogView from "@/views/Catalog/catalogView.vue"
import CartView from "@/views/Cart/cartView.vue";
import Login from "@/views/Login/Login.vue";
import main from "@/views/Main/main.vue"
import catalogView from "@/views/Catalog/catalogView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: main
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: catalogView,
      meta: {requiresAuth: true},
      beforeEnter: (to, from, next) => {
        if (!to.query.page) {
          next({path: to.path, query: {...to.query, page: 1}}); // Добавление параметра
        } else {
          next();
        }
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: {requiresAuth: true}
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: '/main',
      name: 'main',
      component: main
    }
  ],
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Проверяем наличие токена
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});
export default router
