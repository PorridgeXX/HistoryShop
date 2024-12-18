import axios from "axios";
import {defineStore} from "pinia";
import {useFetchGoodsStore} from "@/stores/fetchGoods.js";
import {getCountries, getCategories} from "@/API/catalogRequests.js";

const jwt = localStorage.getItem("token");
export const useAddItemStore = defineStore("useAddItemStore", {
    state: () => ({
        name: '',
        description: '',
        price: 0,
        year: 0,
        country: 0,
        category: 0,
        picture: '',
        newPicture: null,
        countries: [],
        categories: []
    }),
    actions: {
        async fetchImage(event) {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("image", file);

                try {
                    const response = await axios.post("http://localhost:3000/upload", formData, {
                        headers: {"Content-Type": "multipart/form-data"},
                    });
                    console.log(response.data);
                    this.picture = "http://localhost:3000" + response.data.filePath
                    console.log("response", this.picture);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async createItem() {
            const store = useFetchGoodsStore()
            const res = await axios.post("http://localhost:8079/product", {
                    name: this.name,
                    price: this.price,
                    year: this.year,
                    country_id: this.country,
                    category_id: this.category,
                    description: this.description,
                    picture: this.picture
                },
                {
                    params: {
                        jwt: jwt
                    }
                })
            await store.fetchAllGoods({pageSize: 100})

        },
        async deleteItem(id) {
            const store = useFetchGoodsStore()
            await axios.delete("http://localhost:8079/product", {
                params: {
                    jwt: jwt,
                    id: id
                }
            })
            await store.fetchAllGoods({pageSize: 150})
        },
        async changeItem(id) {
            const store = useFetchGoodsStore()
            const pictureToUse = this.picture || this.newPicture
            await axios.patch("http://localhost:8079/product", {
                    name: this.name,
                    price: this.price,
                    year: this.year,
                    country_id: this.country,
                    category_id: this.category,
                    description: this.description,
                    picture: pictureToUse,
                },
                {
                    params: {
                        jwt: jwt,
                        id: id
                    }
                })
            await store.fetchAllGoods({pageSize: 150})
        },
        async getCurrentItem(id) {
            const res = await axios.get("http://localhost:8079/product", {
                params: {
                    id: id
                }
            })
            return res.data
        },
        async addCategory(name) {
            const res = await axios.post("http://localhost:8079/categories", {
                name: name,
            },
                {
                    params: {
                        jwt: jwt
                    }
                })
            await getCategories()
        },
        async addCountries(name) {
            const res = await axios.post("http://localhost:8079/country", {
                    name: name,
                },
                {
                    params: {
                        jwt: jwt
                    }
                })
            await getCountries()
        },
        async deleteCountries(id) {
            const res = await axios.delete("http://localhost:8079/country", {
                params: {
                    jwt: jwt,
                    id: id
                }
            })
            await getCountries()
            const store = useFetchGoodsStore()
            await store.fetchAllGoods({pageSize: 150})
        },
        async deleteCategory(id) {
            const res = await axios.delete("http://localhost:8079/categories", {
                params: {
                    jwt: jwt,
                    id: id
                }
            })
            await getCategories()
            const store = useFetchGoodsStore()
            await store.fetchAllGoods({pageSize: 150})
        },
        async changeCategory(id, name) {
            const res = await axios.patch("http://localhost:8079/categories", {
                name: name
                },
                {
                params: {
                    jwt: jwt,
                    id: id
                }
            })
            await getCategories()
        },
        async changeCountry(id, name) {
            const res = await axios.patch("http://localhost:8079/country", {
                    name: name
                },
                {
                    params: {
                        jwt: jwt,
                        id: id
                    }
                })
            await getCountries()
        }
    }
})