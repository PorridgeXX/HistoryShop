import axios from "axios";
import { AUTH_BASE_URL } from "@/axios/axios.js";

export async function registration(login, email, password) {
    const res = await axios.post(
        `${AUTH_BASE_URL}/auth/register`,
        {
            username: login,
            password: password,
            email: email,
        }
    );
    console.log(res);
    return res.data;
}
