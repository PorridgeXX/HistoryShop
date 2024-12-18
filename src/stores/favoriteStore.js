import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favoriteStore", {
    state: () => ({
        favorites: [], // Список избранных товаров
    }),
    actions: {
        // Загрузка избранного из localStorage
        loadFavorites() {
            const savedFavorites = localStorage.getItem("favorites");
            if (savedFavorites) {
                this.favorites = JSON.parse(savedFavorites);
            }
        },

        // Добавление товара в избранное
        addFavorite(product) {
            const exists = this.favorites.find((item) => item.id === product.id);
            if (!exists) {
                this.favorites.push(product);
                this.saveFavorites();
            }
        },

        // Удаление товара из избранного
        removeFavorite(productId) {
            this.favorites = this.favorites.filter((item) => item.id !== productId);
            this.saveFavorites();
        },

        // Сохранение избранного в localStorage
        saveFavorites() {
            localStorage.setItem("favorites", JSON.stringify(this.favorites));
        },

        // Проверка, находится ли товар в избранном
        isFavorite(productId) {
            return this.favorites.some((item) => item.id === productId);
        },
    },
});
