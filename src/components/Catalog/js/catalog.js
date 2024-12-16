import {loadFromLocalStorage, saveToLocalStorage} from "@/lib/utils.js";
import items from "@/API/items.json"
import {defineStore} from "pinia";

export const useCatalogStore = defineStore("catalog", {
    state: () => ({
        cart: loadFromLocalStorage("cart") || [],
        allChecked: false
    }),
    actions: {

    }
})


// export const saveToCart = (id) =>{
//     const cart = ref(loadFromLocalStorage("cart") || [])
//     const item = items.find(item => item.id === id);
//     const existing = cart.value.find(exItem => item.id === exItem.id);
//     console.log(existing)
//         if(!existing){
//             cart.push(item);
//             saveToLocalStorage("cart", cart);
//         }else{
//             return 0
//         }
// }