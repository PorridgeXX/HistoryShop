import {loadFromLocalStorage} from "@/lib/utils.js";
import {defineStore} from "pinia";

export const useCatalogStore = defineStore("catalog", {
    state: () => ({
        cart: loadFromLocalStorage("cart") || [],
        allChecked: false
    }),
    actions: {

    }
})

