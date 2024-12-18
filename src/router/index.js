import {createRouter, createWebHistory} from 'vue-router'
import CatalogView from "@/views/Catalog/catalogView.vue"
import CartView from "@/views/Cart/cartView.vue";
import Login from "@/views/Login/Login.vue";
import main from "@/views/Main/main.vue"
import catalogView from "@/views/Catalog/catalogView.vue";
import Favorite from "@/views/Favorite/Favorite.vue"
import Profile from "@/views/Profile/profile.vue";
import AdminPanel from "@/views/adminPanel/adminPanel.vue"

import MainLayout from "@/layouts/MainLayouts/mainLayout.vue";
import AdminLayout from "@/layouts/AdminLayouts/adminLayout.vue";

import {useLoginStore} from "@/API/loginRequests.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: MainLayout,
            redirect: '/main',
            children: [
                {
                    path: '/main',
                    name: 'main',
                    component: main,
                },
                {
                    path: '/catalog',
                    name: 'catalog',
                    component: catalogView,
                    meta: {requiresAuth: true},
                    beforeEnter: (to, from, next) => {
                        if (!to.query.page) {
                            next({path: to.path, query: {...to.query, page: 1}});
                        } else {
                            next();
                        }
                    },
                },
                {
                    path: '/cart',
                    name: 'cart',
                    component: CartView,
                    meta: {requiresAuth: true},
                },
                {
                    path: '/favorite',
                    name: 'favorite',
                    component: Favorite,
                    meta: {requiresAuth: true},
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: Profile,
                    meta: {requiresAuth: true},
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/',
            component: AdminLayout,
            children: [
                {
                    path: 'panel',
                    name: 'adminPanel',
                    component: AdminPanel,
                    meta: {requiresAdmin: true},
                },
            ],
        },
    ],
})
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Проверяем, авторизован ли пользователь
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Проверяем, является ли пользователь администратором

    // Проверяем, требует ли маршрут авторизацию
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    }
    // Проверяем, требует ли маршрут права администратора
    else if (to.meta.requiresAdmin && !isAdmin) {
        next('/catalog'); // Перенаправляем на страницу, если пользователь не админ
    }
    // В остальных случаях разрешаем переход
    else {
        next();
    }
});

export default router;
