import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

/**
 * Fetches all items from the backend
 */
export const getItems = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export const getItem = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/items/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching item with id ${id}:`, error);
        throw error;
    }
};

/**
 * Sends admin credentials to the backend for authentication
 */
export const getAdmin = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/admin`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Reports a new item, sending the username session header if the user is logged in
 */
export const postFoundItem = async (itemData) => {
    try {
        // Read the logged-in username to optionally link this new item to their account
        const username = localStorage.getItem('username');
        
        const response = await axios.post(`${BASE_URL}/items`, itemData, {
            headers: username ? { 'Authorization': username } : {}
        });
        return response.data;
    } catch (error) {
        console.error('Error posting found item:', error);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.delete(`${BASE_URL}/items/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting item with id ${id}:`, error);
        throw error;
    }
};

export const userLogin = async ({ email, password }) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error during user login:', error.response?.data || error.message);
        throw error;
    }
};

export const userSignup = async ({ username, email, password }) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, { username, email, password });
        return response.data;
    } catch (error) {
        console.error('Error during user signup:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * NEW FUNCTION: Fetches only the items submitted by the current user for their dashboard
 */
export const getUserItems = async () => {
    try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`${BASE_URL}/user/items`, {
            headers: { 'Authorization': username }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user dashboard items:', error.response?.data || error.message);
        throw error;
    }
};