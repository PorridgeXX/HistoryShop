import axios from 'axios'

export async function login(login, password){
    try{
        const res = await axios.post(
            'http://history-historyasd-8lux02-27c7e4-185-119-59-250.traefik.me/auth/access',
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
        return res.data
    }catch(err){
        return err.response.status;
    }

}