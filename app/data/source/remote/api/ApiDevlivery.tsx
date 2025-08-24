import axios from "axios";
const ApiDelivery = axios.create({
    //baseURL: "http://192.168.1.91:8000/api",
    baseURL: "https://wimm-backend.onrender.com/api/",
    headers: {
        "Content-Type": "application/json"
    }
})

export{ApiDelivery};