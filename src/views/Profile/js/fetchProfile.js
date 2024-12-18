import axios from 'axios'

export async function getProfile(){
    try{
        const res = await axios.get(
            "http://localhost:8080/auth/profile",
            {
                params: {
                    jwt: localStorage.getItem("token"),
                }
            }
        )
        console.log(res)
        return res.data
    }catch(err){
        return err.response;
    }
}