import axios from "axios";
import {useFetchGoodsStore} from "@/stores/fetchGoods.js"


export async function getGoodsList({pageSize = 9, page = null, from = 1800, to = 2024, categories = null, countries = null} = {}){
    try{
        const res = await axios.post(
            "http://localhost:8080/product/list",
            {
                categories,
                countries,
            },
            {
                params: {
                    pageSize,
                    page,
                    from,
                    until: to
                }
        }
        )
        const store = useFetchGoodsStore();
        store.total = res.data.total
        return res.data.products

    }catch(err){
        console.log(err)
    }
}
export async function getCategories() {
    try{
        const res = await axios.get(
            "http://localhost:8080/categories"
        )
        return res.data.categories.map(item => item.name)
    }catch(err){
        console.log(err)
    }
}
export async function getCountries() {
    try{
        const res = await axios.get(
            "http://localhost:8080/country"
        )
        return res.data.countries.map(item => item.name)
    }catch(err){
        console.log(err)
    }
}