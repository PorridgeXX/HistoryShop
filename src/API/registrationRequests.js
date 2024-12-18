import axios from 'axios'

export async function registration(login, email, password){
    const res = await axios.post(
        'http://localhost:8080/auth/register',
        {
            username: login,
            password: password,
            email: email,
        }
    )
    console.log(res)
    return res.data
}