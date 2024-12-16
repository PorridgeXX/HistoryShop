import {defineStore} from "pinia";
import {getGoodsList} from "@/API/goods.js";

export const useFetchGoodsStore = defineStore("useFetchGoodsStore", {
    state: () => ({
        productList: [],
        categories: [],
        countries: [],
        range: [1800, 2024],
        total: 0,
        pageSize: null,
        page: null

    }),
    actions: {
        async fetchAllGoods({pageSize = 9, page = this.page, from = this.range[0], to = this.range[1], categories = this.categories, countries = this.countries} = {}) {
            this.productList = await getGoodsList({pageSize, page, from, to, categories, countries});
            console.log(this.productList)
        }
    }
})