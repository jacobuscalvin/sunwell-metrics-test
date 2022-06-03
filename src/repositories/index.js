import axios from "axios";

const appURL = process.env.VUE_APP_URL; // connect API dari .env
// console.log("Debug: ", appURL);
const baseAxios = axios.create({ // membuat jembatan via axios
  baseURL: appURL // URL ke .env
})

export {
  baseAxios
}