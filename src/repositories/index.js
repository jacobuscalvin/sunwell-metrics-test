import axios from "axios";

const appURL = process.env.APP_REST_API_URL; // connect API dari .env
console.log("Debug: ", appURL);
const baseAxios = axios.create({ // membuat jembatan via axios
                    baseURL: "http://nexus.sunwelldev.site:8080/api/" // URL ke .env
                })

export { 
    baseAxios
}