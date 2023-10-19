import axios from "axios";


const BASE_URL = "https://crowdfunding-backed.onrender.com/api"
// const BASE_URL = "http://localhost:5500/api"



const TOKEN = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) :"blank";


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});


export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
});