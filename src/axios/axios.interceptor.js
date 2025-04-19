import axios from "axios";
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
    baseURL : api_url,
    credentials: "include",
    headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
})

api.interceptors.request.use((config)=>{
  localStorage.getItem
    const accessToken = localStorage.getItem("accessToken")
   
    // console.log(accessToken)

    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config
},
(error) => {
  return Promise.reject(error);
})

export default api