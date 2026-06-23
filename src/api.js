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
}
/**
 * Sends admin credentials to the backend for authentication
 */
export const getAdmin = async (username, password) => {
    try {
        // Swapped to Axios and utilized your BASE_URL variable perfectly
        const response = await axios.post(`${BASE_URL}/admin`, {
            username,
            password
        });
        return response.data; // Axios automatically parses JSON payloads for you!
    } catch (error) {
        // If server returns 401, error.response.data contains your custom error json
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};

export const postFoundItem = async (itemData) => {
    try {
        const response = await axios.post(`${BASE_URL}/items`, itemData);
        return response.data;
    } catch (error) {
        console.error('Error posting found item:', error);
        throw error;
    }
};