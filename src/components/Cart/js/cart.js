import {defineStore} from "pinia"
import {loadFromLocalStorage, saveToLocalStorage} from "@/lib/utils.js";
import {useFetchGoodsStore} from "@/stores/fetchGoods.js";


export const useCartStore = defineStore("cart", {
    state: () => ({
        cart: loadFromLocalStorage("cart") || [],
        total: 0,
        checkedItems: 0,
        checkedList: []
    }),
    actions: {
        loadCart(){
            const cartData = localStorage.getItem("cart");
            if (cartData) {
                this.cart = JSON.parse(cartData); // Парсим данные из строки JSON в массив
            } else {
                this.cart = [];
            }
            saveToLocalStorage("cart", this.cart);
        },
        removeFromCart(id){
            this.cart = this.cart.filter(item => item.id !== id);
            saveToLocalStorage("cart", this.cart);
        },
        deleteAll(){
            this.cart = [];
            saveToLocalStorage("cart", this.cart);
            this.loadCart()
        },
        async saveToCart(id) {
            const store = await useFetchGoodsStore();
            console.log("store:", store);

            const item = store.productList.find(item => item.id === id);
            console.log("item:", item);

            let exItem = this.cart.find(exItem => exItem.id === id);
            console.log("exItem в корзине:", exItem);

            if (item) {
                if (!exItem) {
                    const newItem = {
                        ...item,
                        checked: false
                    };
                    this.cart.push(newItem);
                    saveToLocalStorage("cart", this.cart);
                    console.log("Добавляем товар:", newItem);
                    return true;
                } else {
                    console.log("Товар уже есть в корзине");
                    return false;
                }
            } else {
                console.log("Товар не найден в списке продуктов");
                return false;
            }
        },
        checker(id, checked) {
            if (checked) {
                const item = this.cart.find(item => item.id === id)
                this.checkedList.push(item)
            } else {
                this.checkedList = this.checkedList.filter((item) => item.id !== id);
            }

            console.log(this.checkedList);
            this.calcTotal()
        },
        calcTotal(){
            this.total = this.checkedList.reduce((total, item) => {
                total += parseInt(item.price)
                console.log(typeof item.price)
                return total
            }, 0);
            console.log(this.total);
        }
    }
})