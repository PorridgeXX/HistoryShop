import axios from 'axios'
import {defineStore} from "pinia";
import {saveToLocalStorage} from "@/lib/utils.js";


export const useLoginStore = defineStore("login", {
    state: () => ({
        isLoggedIn: !!localStorage.getItem("token"),
        isAdmin: false
    }),
    actions: {
        async login(login, password) {
            try{
                const res = await axios.post(
                    'http://localhost:8080/auth/access',
                    {
                        username: login,
                        password: password,
                        ip: "192.0.0.1",
                    }
                )
                if (res.data.accessToken){
                    localStorage.setItem('token', res.data.accessToken);
                }
                console.log(res.data)
                this.loginCheck()
                await this.adminStatus()
                return res.data
            }catch(err){
                return err.response.status;
            }
        },
        loginCheck(){
            this.isLoggedIn = !!localStorage.getItem("token");
        },
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("isAdmin");
            this.loginCheck()
        },
        async adminStatus(){
            const res = await axios.get(
                "http://localhost:8080/auth/profile",{
                    params:{
                        jwt: localStorage.getItem('token')
                    }
                }
            )
            saveToLocalStorage("isAdmin", res.data.isAdmin);
        }
    }
})

