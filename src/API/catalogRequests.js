import axios from "axios";
import {useFetchGoodsStore} from "@/stores/fetchGoods.js"
import {useAddItemStore} from "@/views/adminPanel/usage/itemsControl/usage/js/addItem.js";


export async function getGoodsList({pageSize = 9, page = null, from = 1800, to = 2024, categories = [], countries = []} = {}){
    try{
        const res = await axios.post(
            "http://localhost:8079/product/list",
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
        const store = useAddItemStore();
        const res = await axios.get(
            "http://localhost:8079/categories"
        )
        store.categories = res.data.categories.map(item => [item.name, item.id])
        return res.data.categories.map(item => [item.name, item.id])
    }catch(err){
        console.log(err)
    }
}
export async function getCountries() {
    try{
        const store = useAddItemStore();
        const res = await axios.get(
            "http://localhost:8079/country"
        )
        console.log(res)
        store.countries = res.data.countries.map(item => {
            return [item.name, item.id]
        })
        return res.data.countries.map(item => {
            return [item.name, item.id]
        })
    }catch(err){
        console.log(err)
    }
}