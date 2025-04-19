import { ApiPostRequest } from "@/axios/apiRequest";


 const usePost = async (url, request)=> {
    const response = await ApiPostRequest(url, request)
    console.log(response.data)
    if (response){
        return {data: response.data.data, error : response.error , status : response.status}
    }
}

export default usePost;