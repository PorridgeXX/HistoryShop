import axios from 'axios'

export async function registration(login, email, password){
    const res = await axios.post(
        'history-historyasd-8lux02-27c7e4-185-119-59-250.traefik.me/auth/register',
        {
            username: login,
            password: password,
            email: email,
        }
    )
    console.log(res)
    return res.data
}