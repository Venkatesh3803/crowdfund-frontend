import axios from "axios";
const BASE_URL = "https://crowdfunding-backed.onrender.com/api"

export const imageUrl = "https://crowdfunding-backed.onrender.com/"

const user = JSON.parse(localStorage.getItem("user"))
const TOKEN = user?.token

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});


export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },

});