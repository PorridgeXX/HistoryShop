import axios from "axios";
import { AUTH_BASE_URL } from "@/axios/axios.js";

export async function getProfile() {
    try {
        const res = await axios.get(
            `${AUTH_BASE_URL}/auth/profile`,
            {
                params: {
                    jwt: localStorage.getItem("token"),
                }
            }
        );
        console.log(res);
        return res.data;
    } catch (err) {
        return err.response;
    }
}
