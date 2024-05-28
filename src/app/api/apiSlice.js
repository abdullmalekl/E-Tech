import axios from "axios";
const api = axios.create({
    withCredentials: true,
    baseURL: "https://etech.justhost.ly/api",
    headers: {
         "Content-Type" : "application/json", // Set Content-Type to JSON
         "Accept": "application/json"
    }
});
export default api;