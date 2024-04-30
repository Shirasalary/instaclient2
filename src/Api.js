import axios from "axios";

export const sendApiRequest = (path , onSuccess) =>{
    axios.get(path).then(response =>{
        if (response.data.success){
            console.log("success api");
            onSuccess(response);
        }else {
            console.log("error code" + response.data.errorCode);
        }

    })
}
