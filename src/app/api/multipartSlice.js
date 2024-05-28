import axios from "axios";
const multiPart = axios.create({
    withCredentials: true,
    baseURL: "https://etech.justhost.ly/api",
    headers: {
        "Content-Type" : "multipart/form-data",
    }
});
export default multiPart;