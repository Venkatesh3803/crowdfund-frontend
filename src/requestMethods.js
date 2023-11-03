import axios from "axios";


// const BASE_URL = "https://crowdfunding-backed.onrender.com/api"
export const BASE_URL = "http://localhost:5500/api"




export const publicRequest = axios.create({
    baseURL: BASE_URL,
});






export const updateUser = async (endpoint, method, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers,
        data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const makingDonation = async (endpoint, method, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers,
        data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const editProject = async (endpoint, method, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers,
        data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProject = async (endpoint, method, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers,
        data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const creatingProject = async (endpoint, method, data, token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers,
        data,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        throw error;
    }
};
